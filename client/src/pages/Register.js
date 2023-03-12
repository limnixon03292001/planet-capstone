
import planetLogo from '../assets/PLANeTlogo.png';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <div className="p-5">
        <div className="w-full max-w-[800px] m-auto">
            <div className="flex justify-start items-center mb-8">
                <img src={planetLogo} className="w-[75px] h-[73px] mr-2"/>
                <div className="font-bold text-lg">
                    <div>
                        <h1 className="font-bol text-xl">PLANeT</h1>
                        <p className="text-[#536471] text-xs font-light">The perfect place for Malabonian plant enthusiasts.</p>
                    </div>
                </div>
            </div>

            <h1 className="font-bold text-3xl mb-8 ml-3">Create your account</h1>

            <RegisterForm position={2001}/>
        </div>
    </div>
  )
}

export default Register

