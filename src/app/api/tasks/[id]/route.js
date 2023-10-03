import { NextResponse } from "next/server"
import {prisma} from '@/libs/prisma'


export async function POST (request){
    try {
        const {title, description, adultsOnly, youtube_id, premiere = Date(premiere), images, rating} = await request.json()
        const newElement = await prisma.element.create({
            data:
            {
                title,
                description,
                adultsOnly,
                youtube_id,
                premiere,
                images,
                rating
            }
        })
        return NextResponse.json({
            "Response": 'Creating Elements',
            "Request": newElement
        })
    } catch (error) {
        return NextResponse.json(error.message)
    }
}

export async function GET (request, {params}){
    try {
        const Elements = await prisma.element.findUniqueOrThrow({
            where: {
                id: Number(params.id)
            }
        })
        // console.log(Elements);
        return NextResponse.json({
            "Response": "Reading Elements",
            "Elements": Elements
        })
    } catch (error) {
        return NextResponse.json(error.message)
    }
}

export async function PUT (request, {params}){
    try {
        const {title, description, adultsOnly, youtube_id, premiere, images, rating} = await request.json()
        const updateElements = await prisma.element.update({
            where: {
                id: Number(params.id)
            },
            data: {
                title,
                description,
                adultsOnly,
                youtube_id,
                premiere: new Date(premiere), //Converts given date to DATE data type
                images,
                rating
            }
        })
        // console.log(updateTasks);
        return NextResponse.json({
            "Response": "Updating Elements",
            "Elements": updateElements
        })
    } catch (error) {
        return NextResponse.json(error.message)
    }
}

export async function DELETE (request, {params}){
    try {
        const deleteElement = await prisma.element.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json({
            "Response": "Deleting Element",
            "Elements": deleteElement
        })
        
    } catch (error) {
        return NextResponse.json(error.message)
    }
}