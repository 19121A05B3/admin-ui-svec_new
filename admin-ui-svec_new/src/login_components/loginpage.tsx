import { Form, Input, Modal } from "antd";
import { setUserName } from "../store/slices/loginCheck";
import { message } from "antd";
import "antd/dist/antd.css";
import Button from "antd-button-color";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Forgetpass from "./forgetpass";
import { LoginCheck } from "../store/slices/loginCheck";
import { useDispatch } from "react-redux";
import './Sass/customComponent.scss';

const Loginpage = (props: any) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [user, setuser] = useState("");
  const [close,setclose] = useState(false);

  useEffect(()=>{
    if(props.closemodal === true){
      form.resetFields();
      props.handle();
    }
  },[props.closemodal])

  const onFinish = async (values: any) => {
    const vals = await LoginCheck(values);
    setuser(vals.usename);
    if (vals == 1) {
      message.success("Welcome to vikas bindu");
      dispatch(
        setUserName(localStorage.getItem("userName") ?? "")
      );
      form.resetFields();
    }
    if (vals == 2) {
      message.error("wrong credentials");
      form.resetFields();
      form.setFieldsValue({ username: values.username });
    }
    if (vals == 3) {
      message.success("Hai new user reset your password know");
      props.openresetpage(true);
    }
  };

  const forgetOpen = () => {
    setVisible(true);
    props.closeLogin(true);
  };

  const forgetClose = () => {
    setVisible(false);
    setclose(true);
    props.closeLogin(false);
  };
  const handleForgetModal = ()=>{
    setclose(false);
  }


  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label='Phone Number/Email'
          className='margin-unset login-phone-number'
          rules={[{ required: true, message: 'Please input your phone no or email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="phone no / email" />
        </Form.Item>
        <Form.Item
          name="password"
          label='Password'
          className='margin-unset login-phone-number'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password" />
        </Form.Item>
        <Form.Item
          style={{ textAlign: 'center' }}
        >
          <a className="login-form-forgot" style={{ textDecoration: 'underline', color: 'grey' }} onClick={() => { forgetOpen() }}>Forgot Password?</a>
        </Form.Item>

        <Form.Item>
          <Button type="success" htmlType="submit"
            block
          >
            Log in
          </Button>
        </Form.Item>
      </Form>

      <Modal
        centered
        visible={visible}
        onCancel={() => {
          forgetClose();
        }}
        width={500}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <p>Set New password</p>
        <Forgetpass forgetClose={forgetClose} closeForget={close} handler={handleForgetModal} />
      </Modal>
    </>
  );
};

export default Loginpage;
