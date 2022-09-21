import { Chat } from "../models/Chat"
import dayjs from 'dayjs'


export function isSameDay(
    currentMessage: Chat,
    diffMessage: Chat | null | undefined,
) {

    if (!diffMessage || !diffMessage.createdAt) {
        return false
    }

    const currentCreatedAt = dayjs(currentMessage.createdAt)
    const diffCreatedAt = dayjs(diffMessage.createdAt)

    if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
        return false
    }

    return currentCreatedAt.isSame(diffCreatedAt, 'day')
}