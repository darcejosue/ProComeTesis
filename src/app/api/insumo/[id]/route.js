import { NextResponse } from "next/server";
import { connectDB} from '@utils/mongoose';

export function GET(request, {params}){
    return NextResponse.json({
        message: "get id "+ params.id
    })
}

export function DELETE(request, {params}){
    return NextResponse.json({
        message: "delete id "+params.id
    })
}

export function PUT(request, {params}){
    return NextResponse.json({
        message: "put id "+ params.id
    })
}