import { Button, Form, Input } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { actionRegisterAsync } from "../redux/actions/actionRegister";
import Swal from "sweetalert2";

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { error: registerError } = useSelector(store => store.registerStore);

    const validatePhoneNumber = (str, validStringLength) => {
        if (!str) return false;
        const value = str.replace(/\D/g, '');
        const stringLenght = value.length;
        return { isValid: stringLenght === validStringLength, value };
    }

    const onFinish = (values) => {
        const { fullname, email, phone, password } = values;

        const { isValid, value: validPhoneNumber } = validatePhoneNumber(phone, 10);

        if (!isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor verifique el numero teléfonico'
            });

            return;
        }

        dispatch(actionRegisterAsync(fullname, email, password, validPhoneNumber));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (registerError) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error has ocurred, please try again later.'
        });
    } else {
        if(registerError === false) {
            Swal.fire({
                icon: 'success',
                title: 'Congratulations!',
                text: 'Account successfuly created!'
            }).then(() => {
                navigate("/login");
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
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Fullname"
                    name="fullname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your fullname!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
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
                    label="Phone number"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone!',
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
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: '#2BE7E8', border: 'none', borderRadius: '63px' }}>
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
            <p>If you already have an account, <Link to='/login'>go back to login!</Link></p>
        </div>
    );
};

export default Register;