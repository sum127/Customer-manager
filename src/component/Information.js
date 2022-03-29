import React, {useEffect, useState} from 'react';
import {Navbar, Table,  Nav, Button, Modal} from 'react-bootstrap'
import styles from './Information.module.css';
import {connect} from 'react-redux';
import CustomerAskData from '../CustomerAskData'

function Information(props) {

    // true일때 기존정보 false일때 상담이력
    let [informationSwitch, informationSwitchChange] = useState(true);

    let [askList, askListChange] = useState(CustomerAskData);

    let [count, countChange] = useState(0);

    let [info, infoChange] = useState([]);

    useEffect(()=>{
        infoChange(props.state);

        if(props.state.length > 0){
            var arr = askList.filter( e => props.state[0].id === e.id);
            countChange(arr.length)

        }

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
                informationSwitch === true ? <Infor props={props} info={info}></Infor> : 
                <Counsel props={props} askList={askList} askListChange={askListChange} count={count} countChange={countChange}></Counsel>
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

function Counsel(props){
    
    let [modify, modifyChange] = useState(false);

    let [insertSwitch, insertSwitchChange] = useState(false);

    let [ask, askChange] = useState({});

    
    
    function insertCounsel(){
        
        var id = 0;

        if(props.askList.length > 0){
            id = props.askList[props.askList.length-1].id+1;
        }
        
        var today = new Date();

        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var hours = ('0' + today.getHours()).slice(-2); 
        var minutes = ('0' + today.getMinutes()).slice(-2);
        var seconds = ('0' + today.getSeconds()).slice(-2); 

        var dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


        let ask_date = dateString;  
        let ask_content = document.getElementById('ask').value;
        let answer_content = document.getElementById('answer').value;
        let customer_id = props.props.state[0].id;

        let data = {
            id : id,
            ask_date : ask_date,
            ask_content : ask_content,
            answer_content : answer_content,
            customer_id : customer_id
        }

        var copy = [...props.askList]
        copy.push(data);
        props.askListChange(copy);

        props.countChange(props.count+1);

        insertSwitchChange(false)
    }
    
    const modifySwitchFn = function(no){
        modifyChange(true);
        
        let index = props.askList.findIndex(( a )=>{ return a.id === no })
        
        let id = props.askList[index].id;
        let ask_date =props.askList[index].ask_date;
        let ask_content = props.askList[index].ask_content;
        let answer_content = props.askList[index].answer_content;
        let customer_id = props.askList[index].customer_id;

        let data = {
            id : id,
            ask_date : ask_date,
            ask_content : ask_content,
            answer_content : answer_content,
            customer_id : customer_id
        }

        askChange(data);
    }

    const modifyCounsel = function(){
        let id = ask.id;
        let ask_date = ask.ask_date;
        let ask_content = document.getElementById("modifyAsk").value;
        let answer_content = document.getElementById("modifyAnswer").value
        let customer_id = ask.customer_id;

        let data = {
            id : id,
            ask_date : ask_date,
            ask_content : ask_content,
            answer_content : answer_content,
            customer_id : customer_id
        }

        let index = props.askList.findIndex(( a )=>{ return a.id === id })

        let copy = [...props.askList];
        copy[index] = data;
        props.askListChange(copy);

        modifyChange(false);
    }

    return(
        
        <>
            {
                insertSwitch === true ?
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>상담 추가</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>상담내용</p>
                        <textarea name="" id="ask" cols="30" rows="5"></textarea>
                        <p>답변</p>
                        <textarea name="" id="answer" cols="30" rows="5"></textarea>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" type="button" onClick={()=>{insertSwitchChange(false)}}>닫기</Button>
                        <Button variant="primary" type="button" onClick={insertCounsel}>저장하기</Button>
                    </Modal.Footer>
                </Modal.Dialog>
                : null
            }

            {
                modify === true ?
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>상담 수정</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>상담내용</p>
                        <textarea name="" id="modifyAsk" cols="30" rows="5">{ask.ask_content}</textarea>
                        <p>답변</p>
                        <textarea name="" id="modifyAnswer" cols="30" rows="5">{ask.answer_content}</textarea>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"  onClick={()=>{modifyChange(false)}}>닫기</Button>
                        <Button variant="primary" type="button" onClick={modifyCounsel}>수정하기</Button>
                    </Modal.Footer>
                </Modal.Dialog>
                : null
            }
            
            {
                insertSwitch === false && modify === false ?
                <>
                    <h4>상담이력</h4>
                    <span>전체 {props.count}</span>
                    <Button style={{marginLeft:"20px"}} onClick={()=>{insertSwitchChange(true)}}>상담 추가</Button>

                    <Table  striped bordered hover>
                        <thead>
                            <tr>
                            <th>접수번호</th>
                            <th>접수일자</th>
                            <th>상담내용</th>
                            <th>답변</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {
                                props.askList.map((a, i)=>{
                                    if(props.props.state.length > 0){
                                        if(props.props.state[0].id === a.customer_id){
                                            return(
                                                <tr key={i}>
                                                    <td>{ a.id }</td>
                                                    <td>{ a.ask_date }</td>
                                                    <td>{ a.ask_content }</td>
                                                    <td>{ a.answer_content }</td>
                                                    <td><Button onClick={()=>{
                                                        modifySwitchFn(a.id);
                                                    }}>수정</Button></td>
                                                </tr>
                                            )
                                        }
                                    }
                                })
                            }
                        </tbody>
                    </Table>
                </>
                :null
            }
        </>
    )
}


function reduxFn(state){
    return  {state : state}
}

export default connect(reduxFn)(Information)