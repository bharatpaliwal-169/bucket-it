import { GlobalConstants } from '@/constants/siteData/siteData'
import AuthForm from '@/components/frontend/AuthUI/AuthForm'
import React from 'react'

const SignUp = () => <AuthForm type={GlobalConstants.signup as "SIGNUP"} />

export default SignUp