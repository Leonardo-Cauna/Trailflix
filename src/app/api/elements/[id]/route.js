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
                rating,
                totalRatings,
                ratings,
                comments
            }
        })
        return NextResponse.json({
            "response": 'Creating Elements',
            "request": newElement
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
            "response": "Reading Elements",
            "elements": Elements
        })
    } catch (error) {
        return NextResponse.json(error.message)
    }
}

export async function PUT (request, {params}){
    try {
        const {title, description, adultsOnly, youtube_id, premiere, images, rating, totalRatings, ratings, comments} = await request.json()
        if(premiere){
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
                    rating,
                    totalRatings,
                    ratings,
                    comments
                }
            })
            // console.log(updateTasks);
            return NextResponse.json({
                "response": "Updating Elements",
                "elements": updateElements
            })
        }
        else{
            const updateElements = await prisma.element.update({
                where: {
                    id: Number(params.id)
                },
                data: {
                    title,
                    description,
                    adultsOnly,
                    youtube_id,
                    premiere,
                    images,
                    rating,
                    totalRatings,
                    ratings,
                    comments
                }
            })
            // console.log(updateTasks);
            return NextResponse.json({
                "response": "Updating Elements",
                "elements": updateElements
            })
        }
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
            "response": "Deleting Element",
            "elements": deleteElement
        })
        
    } catch (error) {
        return NextResponse.json(error.message)
    }
}