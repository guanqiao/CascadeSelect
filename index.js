/*
 * @Author: Jason Deng
 * @LastEditors: Jason Deng
 * @Date: 2020-08-10 22:31:26
 * @LastEditTime: 2020-08-11 15:47:21
 * @Description: 二级Select联动组件
 */
import React,{ useState } from "react";
import { Select } from "antd";
import deepEqual  from "deep-equal";
const { Option } = Select;

const isEqual = (prevProps, nextProps) => {
 // console.log(prevProps.data);
 // console.log(nextProps.data);
 // console.log("prevProps.data:" + JSON.stringify(prevProps.data));
 // console.log("nextProps.data:" + JSON.stringify(nextProps.data));
 console.log(nextProps.firstOptionLabel+"isEqual:" + (deepEqual(prevProps.data,nextProps.data)) );
 return deepEqual(prevProps.data,nextProps.data);
};

const CascadeSelect=React.memo(function (props) {
 const {firstOptionLabel,secondOptionLabel,data,onFirstChange,onSecondChange,getSecondOptionKey,getSecondOptionValue,firstSelectStyle,secondSelectStyle}=props;
 console.log(props);
 const firstOptions=Object.keys(data)||[];
 const secondOptionsInit=Object.values(data)[0]||[];
 // console.log("secondOptionsInit:"+secondOptionsInit);
 let [secondOptions, setSecondOptions] = useState(secondOptionsInit);

 function onFirstOptionsChange(e){
  setSecondOptions(data[e]);
  onFirstChange(e);
 }

 function onSecondOptionsChange(e){
  onSecondChange(e);
 }
 
 return (
  <>
   <li>
    <span>{firstOptionLabel}</span>
    <Select style={firstSelectStyle} onChange={(e) => {onFirstOptionsChange(e);}}>
      {firstOptions.map(item => (<Option key={item} value={item}>{item}</Option>))}
    </Select>
    </li>
    <li>
    <span>{secondOptionLabel}</span>
    <Select style={secondSelectStyle}  onChange={(e) => {onSecondOptionsChange(e);}}>
      {secondOptions.map(item => (<Option key={getSecondOptionKey(item)} value={getSecondOptionValue(item)}>{getSecondOptionValue(item)}</Option>))}
    </Select>
   </li>
   </>
 );
}
,isEqual);

CascadeSelect.displayName="CascadeSelect";

export default CascadeSelect;