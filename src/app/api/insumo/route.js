import { NextResponse } from "next/server";
import { connectDB} from '../../utils/mongoose';
import Insumo from "../../../models/Insumo";

export async function GET(){
    connectDB();
    const insumo = await Insumo.find()
    return NextResponse.json(insumo)
}

export async function POST(request){
    const data = request.json()
    const newInsumo = new Insumo(data)
    const saveInsumo = await newInsumo.save()
    return NextResponse.json(saveInsumo)
}

