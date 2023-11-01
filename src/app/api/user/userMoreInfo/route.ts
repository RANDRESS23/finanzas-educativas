import { db } from "@/libs/prismaDB";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const diferentDocuments = body.documentSession !== body.document
    const diferentEmails = body.emailSession !== body.email

    if (diferentDocuments) {
      const existingUserByDocument = await db.user.findUnique({
        where: { document: body.document },
      });
  
      if (existingUserByDocument !== null) {
        return NextResponse.json(
          { messsage: "El número de documento ya está en uso" },
          { status: 400 },
        );
      }
    }

    if (diferentEmails) {
      const existingUserByEmail = await db.user.findUnique({
        where: { email: body.email },
      });
  
      if (existingUserByEmail !== null) {
        return NextResponse.json(
          { messsage: "El correo electrónico ya se encuentra en uso" },
          { status: 400 },
        );
      }
    }

    const userExtraInfo = await db.userMoreInfo.create({
      data: {             
        userId: body.userId,                        
        gender: body.gender,                        
        age: body.age.split(","),                           
        civilStatus: body.civilStatus,                   
        educationLevel: body.educationLevel,                
        residenceArea: body.residenceArea,                 
        typeOfHousing: body.typeOfHousing,                 
        houseServices: body.houseServices,                 
        socioeconomicLevel: Number(body.socioeconomicLevel),            
        numberPeopleContributing: Number(body.numberPeopleContributing),      
        incomeComeFrom: body.incomeComeFrom,                
        isInAPensionFund: Boolean(body.isInAPensionFund),              
        healthSystemAffiliation: body.healthSystemAffiliation,       
        numberPeopleDependFinancially: Number(body.numberPeopleDependFinancially), 
        financialProducts: body.financialProducts,
      },
    });

    return NextResponse.json(
      {
        userExtraInfo,
        message: "Información adicional registrada correctamente",
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.log({ error });

    return NextResponse.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}
