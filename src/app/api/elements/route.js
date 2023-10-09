import { NextResponse } from "next/server"
import {prisma} from '@/libs/prisma'

export async function GET (){
    const elements = await prisma.element.findMany()
    // console.log(Elements);
    return NextResponse.json({
        "response": "Reading Elements",
        "elements": elements
    })
}

export async function POST (request){
    try {
        const {title, description, adultsOnly, youtube_id, premiere, images, rating, totalRatings, ratings, comments} = await request.json()
        if (premiere) {
            const newElement = await prisma.element.create({
                data:
                {
                    title,
                    description,
                    adultsOnly,
                    youtube_id,
                    premiere: new Date(premiere),
                    images,
                    rating,
                    totalRatings,
                    ratings,
                    comments
                }
            })
            return NextResponse.json({
                "Response": 'Creating Elements',
                "Request": newElement
            })
        }
        else{
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
                "Response": 'Creating Elements',
                "Request": newElement
            })
        }
    } catch (error) {
        return NextResponse.json(error.message)
    }
}