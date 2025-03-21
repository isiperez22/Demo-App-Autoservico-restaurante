'use client'

import "react-toastify/ReactToastify.css"
import { ToastContainer } from "react-toastify"

export default function ToastifyNotification() {
  return (
    <ToastContainer
      theme="colored"
      position="top-center"
      autoClose={3000}
    />
  )
}
