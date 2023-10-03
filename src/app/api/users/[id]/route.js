import { NextResponse } from "next/server"
import {prisma} from '@/libs/prisma'


// export async function POST (request){
//     try {
//         const {title, description, adultsOnly, youtube_id, premiere = Date(premiere), images, rating} = await request.json()
//         const newUser = await prisma.user.create({
//             data:
//             {
//                 title,
//                 description,
//                 adultsOnly,
//                 youtube_id,
//                 premiere,
//                 images,
//                 rating
//             }
//         })
//         return NextResponse.json({
//             "Response": 'Creating Users',
//             "Request": newUser
//         })
//     } catch (error) {
//         return NextResponse.json(error.message)
//     }
// }

export async function GET (request, {params}){
    try {
        const Users = await prisma.user.findUniqueOrThrow({
            where: {
                id: Number(params.id)
            }
        })
        // console.log(Users);
        return NextResponse.json({
            "Response": "Reading Users",
            "Users": Users
        })
    } catch (error) {
        return NextResponse.json(error.message)
    }
}

export async function PUT (request, {params}){
    try {
        const {username, avatar, about_me, comments, ratings} = await request.json()
        const updateUsers = await prisma.user.update({
            where: {
                id: Number(params.id)
            },
            data: {
                username,
                avatar,
                about_me,
                comments,
                ratings
            }
        })
        // console.log(updateTasks);
        return NextResponse.json({
            "Response": "Updating Users",
            "Users": updateUsers
        })
    } catch (error) {
        return NextResponse.json(error.message)
    }
}

export async function DELETE (request, {params}){
    try {
        const deleteUser = await prisma.user.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json({
            "Response": "Deleting User",
            "Users": deleteUser
        })
        
    } catch (error) {
        return NextResponse.json(error.message)
    }
}