import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { actionLoginAsync, loginGoogle, loginFacebook, actionLoginSync, actionAuthenticatedSync } from "../redux/actions/actionLogin";
import { authentication } from "../Firebase/firebaseConfig"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import facebook from "../images/facebook.png"
import google from "../images/google.png"

authentication.useDeviceLanguage();

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error: loginError } = useSelector(store => store.loginStore);

    const onFinish = async (values) => {
        const { email, password } = values;
        dispatch(actionLoginAsync(email, password));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    console.log({ loginError });
    if (loginError) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Datos de login incorrectos"
        }).then(() => {
            dispatch(actionLoginSync({ error: undefined }));
        });
    } else {
        if(loginError === false) {
            Swal.fire({
                icon: 'success',
                title: 'Congratulations.',
                text: "Welcome to Pokedex App"
            }).then(() => {
                dispatch(actionAuthenticatedSync());
            });
        }
    }
    
    return (
        <div style={{ width: 400, margin: "3em" }}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    email: "whitneystena418@gmail.com",
                    password: "Welcome1",
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: '#2BE7E8', border: 'none', borderRadius: '63px' }} block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
            <div style={{ margin: "auto", display: "flex", justifyContent: "center", flexDirection: 'column' }}>
                <div style={{ display: "flex", justifyContent: "center", marginLeft: '140px' }}>
                    <Button type="primary" htmlType="button" onClick={() => dispatch(loginGoogle())} style={{ backgroundColor: 'transparent', border: 'none' }}><img src={google} alt='google' /></Button>
                    <Button type="primary" htmlType="button" onClick={() => dispatch(loginFacebook())} style={{ backgroundColor: 'transparent', border: 'none' }}><img src={facebook} alt='facebook' /></Button>
                </div>
                <br></br>
                <p style={{ marginLeft: '140px' }}><Link to='/register'>Click here</Link> if you still don't have an account!</p>
            </div>
        </div>
    );
};

export default Login;