import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const refresh = searchParams.get('refresh');

  if(!token || !refresh){
    return NextResponse.redirect(new URL("/", req.url))
  }

  const cookieStore = cookies();

  (await cookieStore).set('token', token, {
     httpOnly: true,
     secure: false,
     expires:  new Date(Date.now() + 1 * 60 * 60 * 1000),
     sameSite: 'lax',
     path: '/',
   });

  (await cookieStore).set('refresh', refresh, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: 'lax',
    path: '/',
  });

  return NextResponse.redirect(new URL('/dashboard', req.url))

  
}