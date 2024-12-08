import { GlobalConstants } from '@/constants/siteData/siteData'
import AuthForm from '@/components/frontend/AuthUI/AuthForm'
import React from 'react'

const SignIn = () => <AuthForm type={GlobalConstants.signin as "SIGNIN"} />

export default SignIn