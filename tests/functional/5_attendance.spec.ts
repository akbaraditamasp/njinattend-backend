import { file } from '@ioc:Adonis/Core/Helpers'
import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Attendance', () => {
  test('Save in record', async ({ client, assert }) => {
    const fakeAvatar = await file.generatePng('1mb')
    const user = await User.first()

    assert.isTrue(Boolean(user))

    const response = await client
      .put(`/api/attendance/in`)
      .file('face', fakeAvatar.contents, { filename: fakeAvatar.name })
      .fields({
        latitude: -6.3300833959002,
        longitude: 106.81370747608787,
      })
      .loginAs(user!)

    try {
      response.assertStatus(200)
    } catch (e) {
      response.assertStatus(422)
    }
  })
})
