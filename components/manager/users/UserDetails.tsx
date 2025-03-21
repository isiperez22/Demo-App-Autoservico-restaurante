import { deleteUser } from "@/actions/delete-user-action"
import { formatDate } from "@/src/utils"
import { User } from "@prisma/client"


type UserDetailsProps = {
  user: User
}

export default function UserDetails({ user }: UserDetailsProps) {
  return (
    <tr>
      <td className="whitespace-nowrap px-5 text-left text-sm font-medium text-gray-900 sm:pl-0">
        {user.id}
      </td>
      <td className="whitespace-nowrap px-5 text-sm text-left font-medium text-gray-900 sm:pl-0">
        {user.username}
      </td>
      <td className="whitespace-nowrap px-5 text-sm text-left font-medium text-gray-900 sm:pl-0">
        {formatDate(user.createdAt)}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <form action={
          deleteUser
        }>
          <input type="hidden" name="id" value={user.id} />
          <button className="px-3 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-500">
            Borrar usuario
          </button>
        </form>
      </td>
    </tr>
  )
}
