import "antd/dist/antd.css";
import { useState } from "react";
import Loginpage from "./loginpage";
import Resetpass from "./resetpass";
import Registration from "./registration";
import { Modal, PageHeader, Carousel } from 'antd';
import Button from "antd-button-color";
import 'antd-button-color/dist/css/style.css';
import Logo from '../images/vbLogo.png';
import firstImage from '../images/landingImage.png';
import secondImage from '../images/Vikasbandhu_Five.jpg';
import thirdImage from '../images/Vikasbandhu_One.jpg';
import fourthImage from '../images/Vikasbandhu_Two.jpg';
import fifthImage from '../images/Image_Govt1.jpg';
const contentStyle = {
  height: '88vh',
  color: '#fff',
  lineHeight: '160px',
  background: '#364d79',
};

const imageStyle = {
  width: '100%',
  height: '88vh',
};
const Loginmodal = () => {
  const [visiblelog, setVisiblelog] = useState(false);
  const [visiblereg, setVisiblereg] = useState(false);
  const [logforget, setLogforget] = useState(false);
  const [openreset, setopenreset] = useState(false);
  const [val,setval]=useState(false);
  const closeLogin = (data: boolean) => {
    setLogforget(data);
  };
  const closeRegister = (data: boolean) => {
    setVisiblereg(data);
  };


  const openresetpage = (data: boolean) => {
    setopenreset(data);
  };

  const clearLogin = (clearState: any) =>{
      setVisiblelog(false);
      setval(true);
  };

  const handleModal = ()=>{
    setval(false);
  }


  return (
    <div>
      <PageHeader
        className="site-page-header-responsive"
        title="VikasBandhu"
        extra={[
          <Button key="1" type="success" onClick={() => setVisiblelog(true)}>
            Login
          </Button>,
          <Button key="2" type="success" with="ghost" onClick={() => setVisiblereg(true)}>Register</Button>,
        ]}
        avatar={{ src: Logo }}
      >
      </PageHeader>


      <Modal
        centered
        visible={(!logforget && visiblelog) && !openreset && visiblelog} // || !openreset && visiblelog
        onCancel={clearLogin}
        footer={null}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <p></p>
        <Loginpage closeLogin={closeLogin} openresetpage={openresetpage} clearform={clearLogin} closemodal={val} handle={handleModal}/>
      </Modal>

      <Modal
        centered
        visible={openreset}
        footer={null}
        onCancel={() => {setopenreset(false)}}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <Resetpass openresetpage={openresetpage} closemodal={val} handle={handleModal}/>
      </Modal>

      <Modal
        centered
        visible={visiblereg}
        footer={null}
        onCancel={() => {setVisiblereg(false); setval(true)}}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        bodyStyle={{ overflowY: 'scroll', height: 600 }}
      >
        <p>Registration</p>
        <Registration closeRegister={closeRegister} closemodal={val} handle={handleModal}/>
      </Modal>

      <Carousel autoplay speed={1000}>
        <div>
          <h3 style={contentStyle}><img style={imageStyle} src={firstImage} alt='firstImage' /></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img style={imageStyle} src={secondImage} alt='firstImage' /></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img style={imageStyle} src={thirdImage} alt='firstImage' /></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img style={imageStyle} src={fourthImage} alt='firstImage' /></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img style={imageStyle} src={fifthImage} alt='firstImage' /></h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Loginmodal;