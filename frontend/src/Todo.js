import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Table,Container } from "react-bootstrap";
import axios from "axios";

const Todo = () => {
  const [text, setText] = useState("");
  const [blog, setBlog] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [count,setCount]=useState(0)

  const updateHandler = (id) => {
    const editItem = blog.find((blog) => blog._id === id);
//    console.log(editItem._id);
    setEdit(true);
    setId(editItem._id);
    
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (edit) {
      if (text.trim()) {
        const updateData = async () => {
          //console.log(id);
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          await axios.put(
            `https://percily.herokuapp.com/todoupdate`,
            { text, id },
            config
          );
        };
        updateData();
        setEdit(false);
        setCount(count+1)
        setText("")
      } else {
        console.log("Nothing to display");
      }
    } else {
      setEdit(false);
      if (text.trim()) {
        const postData = async () => {
          //console.log(text);
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          await axios.post(`https://percily.herokuapp.com/todo`, { text }, config);
        };
        postData();
        setText("")        
      } else {
        console.log("Nothing to display");
      }
    }
  };
  const fetchBlog = async () => {
    const { data } = await axios.get(`https://percily.herokuapp.com/show`);
    setBlog(data);
  };

  useEffect(() => {
    fetchBlog();
  }, [blog]);
  return (
    <div  className="flex-container">
        
      
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type="text"
          name="q"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add text"
          className="mr-sm-2 ml"
        ></Form.Control>
        <Button type="submit" variant="primary" className="p-2">
          {edit ? "Edit " : "Add text"}
        </Button>
      </Form>
      <Table  striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
          <th>ID</th>
          <th>Blog</th>
          <th>update</th>
          </tr>
          
        </thead>
        <tbody>
          {blog.map((blog) => (
            <tr key={blog._id}>
              <td>{blog._id}</td>
              <td>{blog.blog}</td>
              <td>
                {
                  <Button
                    variant="dark"
                    className="btn-sm"
                    onClick={() => updateHandler(blog._id)}
                  >
                    Edit
                  </Button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
     <Row>
         <Col md={6} xs={6}>
             <h3>Total no document {blog.length} </h3>
         </Col>
         <Col md={6} xs={6}>
             <h3> update happen {count} </h3>
         </Col>
     </Row>
      
     
    </div>
  );
};

export default Todo;
