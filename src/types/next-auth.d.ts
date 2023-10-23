import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: integer
      documentType: string
      document: string
      firstName: string
      lastName: string
      phoneNumber: string
      email: string
      hashedPassword: string
      createdAt: Date
      updatedAt: Date
    }
  }
}
