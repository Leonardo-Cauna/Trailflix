import { NextResponse } from "next/server"
import {prisma} from '@/libs/prisma'

export async function GET (){
    const Users = await prisma.user.findMany()
    // console.log(Users);
    return NextResponse.json({
        "Response": "Reading Users",
        "Users": Users
    })
}

export async function POST (request){
    try {
        const {username, avatar, about_me, comments, ratings} = await request.json()
        const newUser = await prisma.user.create({
            data:
            {
                username,
                avatar,
                about_me,
            }
        })
        return NextResponse.json({
            "Response": 'Creating Users',
            "Request": newUser
        })
    } catch (error) {
        return NextResponse.json(error.message)
    }
}