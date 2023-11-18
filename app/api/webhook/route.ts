/* eslint-disable camelcase */
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('WEBHOOK_SECRET is not set')
  }

  const headerPayload = headers()

  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (error) {
    console.error("Error verifying webhook", error)
    return new Response('Invalid webhook', { status: 400 })
  }

  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, username, first_name, last_name } = evt.data

    // Create user in DB
    const mongoUser = await createUser({
      clerkId: id,
      name: `${first_name}${last_name ? ` ${last_name}` : ''}`,
      username: username!,
      email: email_addresses[0].email_address,
      picture: image_url,
    })

    return NextResponse.json({ message: 'created', user: mongoUser })
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, image_url, username, first_name, last_name } = evt.data

    // Create user in DB
    const mongoUser = await updateUser({
      clerkId: id,
      updateData: {
        name: `${first_name}${last_name ? ` ${last_name}` : ''}`,
        username: username!,
        email: email_addresses[0].email_address,
        picture: image_url,
      },
      path: `/profile/${id}`
    })

    return NextResponse.json({ message: 'updated', user: mongoUser })
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    const deletedUser = await deleteUser({
      clerkId: id!,
    })

    return NextResponse.json({ message: 'deleted', user: deletedUser })
  }

  return new Response('', { status: 201 })
}