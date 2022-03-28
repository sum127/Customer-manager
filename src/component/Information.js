import React, {useEffect, useState} from 'react';
import {Navbar, Table,  Nav} from 'react-bootstrap'
import styles from './Information.module.css';
import {connect} from 'react-redux';

function Information(props) {

    // true일때 기존정보 false일때 상담이력
    let [informationSwitch, informationSwitchChange] = useState(true);

    let [info, infoChange] = useState([]);

    useEffect(()=>{
        infoChange(props.state);
    },[props.state])

    return (
        <div>
        <>
            <Navbar bg="white">
            <Nav>
                <Nav style={{marginRight:'50px', marginBottom:'30px'}} onClick={()=>{informationSwitchChange(true)}}>기본 정보</Nav>
                <Nav onClick={()=>{informationSwitchChange(false)}}>상담 이력</Nav>
            </Nav>
            </Navbar>
            {
                informationSwitch === true ? <Infor props={props} info={info}></Infor> : <Counsel></Counsel>
            }
        </>
        
        </div>
    );
}

function Infor(props){
    return(
        <>
            {
                props.info.length > 0 ? 
                <ul className={styles.infoList}>
                    <li><span>고객ID</span><input type="text" value={props.info[0].id}/></li>
                    <li><span>차량번호</span><input type="text" value={props.info[0].car_num}/></li>
                    <li><span>소유자</span><input type="text" value={props.info[0].owner}/></li>
                    <li><span>소유형태</span><input type="text" value={props.info[0].owner_type}/></li>
                    <li><span>연락처</span><input type="text" value={props.info[0].phone}/></li>
                    <li><span>제조사</span><input type="text" value={props.info[0].vender}/></li>
                    <li><span>차량명</span><input type="text" value={props.info[0].car_name}/></li>
                    <li><span>세부모델</span><input type="text" value={props.info[0].car_detail_model}/></li>
                </ul> : null
            }
        </>
    )
}

function Counsel(){
    return(
        <>
        </>
    )
}


function reduxFn(state){
    return  {state : state}
}

export default connect(reduxFn)(Information)