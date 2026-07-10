interface AuthPageProps {
    mode: 'register' | 'login'
}
const AuthPage = ({ mode }: AuthPageProps) => {
    return (
        <>{mode}</>
    )
}
export default AuthPage