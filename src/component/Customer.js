import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav, Table, Button} from 'react-bootstrap'
import CustomerData from '../CustomerData'
import styles from './Customer.module.css';



function Customer(props) {

    // true일때 고객조회 false일때 목록조회
    let [customerSwitch, customerSwitchChange] = useState(true);
    
    let [customerList, customerListChange] = useState(CustomerData);

    

    return (
        <div>
        <>
            <Navbar bg="white">
            <Nav>
                <Nav onClick={()=>{customerSwitchChange(true)}} style={{marginRight:'50px', marginBottom:'30px'}}>고객 조회</Nav>
                <Nav onClick={()=>{customerSwitchChange(false)}}>고객 목록</Nav>
            </Nav>
            </Navbar>
            {
                customerSwitch === true ? <SearchBar customerList={customerList} props={props}></SearchBar> : <MemberList className={styles.memberTable} customerList={customerList}></MemberList>
            }
        </>
        </div>
    );
}

function SearchBar(props){

    let [searchSwitch, searchSwitchChange] = useState(false);
    let [value, valueChange] = useState("");


    useEffect(()=>{
        if(value.length > 0){
            searchSwitchChange(true);
        }else{
            searchSwitchChange(false);
        }
    },[value])

    const list = props.customerList.map((a, i)=>{

        if(a.phone.indexOf(value) > -1){

            return(
                    <li key={i}>
                        <button className={styles.liButton} onClick={()=>{
                            var copy = [...value];
                            copy = a.phone;
                            valueChange(copy);
                            document.getElementById("text").value = a.phone}
                        }>
                            { a.phone }
                        </button>
                    </li>
            )
        }

            
    })

    const findInfomation = function(){
        props.customerList.map((a, i)=>{
            if(a.phone === document.getElementById("text").value){
                props.props.dispatch({type: 'findInformation', PAYLOAD : a});
            }
        })

    }

    return(
        <div>
            <input id="text" type="text" placeholder="전화번호를 입력해주세요" size="30" onChange={(e)=>{valueChange(e.target.value)}}/>
            <Button onClick={findInfomation}>조회</Button>
            {
                searchSwitch === true ?
                
                <ul ul className={styles.searchBar}>{list}</ul>

                : null
            }
            
        </div>
    )
}

function MemberList(props){
    return(
        <div>
            <Table  striped bordered hover>
                <thead>
                    <tr>
                    <th>No</th>
                    <th>연락처</th>
                    <th>차량번호</th>
                    <th>활성/비활성</th>
                    <th>가입일시</th>
                    </tr>
                </thead>
                {
                    props.customerList.map((a, i)=>{
                        return(
                            <tbody>
                                <tr key={i}>
                                    <td>{ a.id }</td>
                                    <td>{ a.phone }</td>
                                    <td>{ a.car_num }</td>
                                    <td>{ a.activate }</td>
                                    <td>{ a.join_date }</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
        </div>
    )
}


function reduxFn(props){
    return  {state : props.reducer}
  }
  
  export default connect(reduxFn)(Customer)

