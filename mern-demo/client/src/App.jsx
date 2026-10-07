
import { useEffect, useState } from "react";

function App() {
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingId, setEditingId] = useState(null);

    const API_URL = "http://localhost:5000/api/students";

    // Lấy danh sách sinh viên
    function getStudents() {
        fetch(API_URL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setStudents(data);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    // Thêm sinh viên
    function addStudent() {
        if (studentId === "" || name === "" || email === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentId: studentId,
                name: name,
                email: email
            })
        })
            .then(function(response) {
                return response.json();
            })
            .then(function() {
                alert("Thêm sinh viên thành công!");
                clearForm();
                getStudents();
            })
            .catch(function(error) {
                console.log(error);
                alert("Có lỗi khi thêm sinh viên!");
            });
    }

    // Cập nhật sinh viên
    function updateStudent() {
        if (studentId === "" || name === "" || email === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        fetch(API_URL + "/" + editingId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentId: studentId,
                name: name,
                email: email
            })
        })
            .then(function(response) {
                return response.json();
            })
            .then(function() {
                alert("Cập nhật thành công!");
                clearForm();
                getStudents();
            })
            .catch(function(error) {
                console.log(error);
                alert("Có lỗi khi cập nhật!");
            });
    }

    // Xóa sinh viên
    function deleteStudent(id) {
        if (!window.confirm("Bạn có chắc muốn xóa sinh viên này không?")) {
            return;
        }

        fetch(API_URL + "/" + id, {
            method: "DELETE"
        })
            .then(function(response) {
                return response.json();
            })
            .then(function() {
                alert("Xóa sinh viên thành công!");
                getStudents();
            })
            .catch(function(error) {
                console.log(error);
                alert("Có lỗi khi xóa!");
            });
    }

    // Đưa dữ liệu lên form để sửa
    function editStudent(student) {
        setStudentId(student.studentId);
        setName(student.name);
        setEmail(student.email);
        setEditingId(student._id);
    }

    // Xóa form
    function clearForm() {
        setStudentId("");
        setName("");
        setEmail("");
        setEditingId(null);
    }

    useEffect(function() {
        getStudents();
    }, []);

    return (
        <div
            style={{
                width: "800px",
                margin: "30px auto",
                fontFamily: "Arial"
            }}
        >
            <h1>QUẢN LÝ SINH VIÊN - Version 2.0</h1>

            <h2>
                {editingId ? "Cập nhật sinh viên" : "Thêm sinh viên"}
            </h2>

            <input
                type="text"
                placeholder="MSSV"
                value={studentId}
                onChange={function(e) {
                    setStudentId(e.target.value);
                }}
                style={{
                    padding: "10px",
                    margin: "5px",
                    width: "200px"
                }}
            />

            <input
                type="text"
                placeholder="Họ tên"
                value={name}
                onChange={function(e) {
                    setName(e.target.value);
                }}
                style={{
                    padding: "10px",
                    margin: "5px",
                    width: "200px"
                }}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={function(e) {
                    setEmail(e.target.value);
                }}
                style={{
                    padding: "10px",
                    margin: "5px",
                    width: "200px"
                }}
            />

            <br />

            {editingId ? (
                <div>
                    <button
                        onClick={updateStudent}
                        style={{
                            padding: "10px 20px",
                            margin: "10px 5px"
                        }}
                    >
                        Cập nhật
                    </button>

                    <button
                        onClick={clearForm}
                        style={{
                            padding: "10px 20px",
                            margin: "10px 5px"
                        }}
                    >
                        Hủy
                    </button>
                </div>
            ) : (
                <button
                    onClick={addStudent}
                    style={{
                        padding: "10px 20px",
                        margin: "10px 5px"
                    }}
                >
                    Thêm sinh viên
                </button>
            )}

            <h2>Danh sách sinh viên</h2>

            {students.length === 0 ? (
                <p>Chưa có sinh viên.</p>
            ) : (
                students.map(function(student) {
                    return (
                        <div
                            key={student._id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "15px",
                                marginBottom: "10px"
                            }}
                        >
                            <p>
                                <b>MSSV:</b> {student.studentId}
                            </p>

                            <p>
                                <b>Họ tên:</b> {student.name}
                            </p>

                            <p>
                                <b>Email:</b> {student.email}
                            </p>

                            <button
                                onClick={function() {
                                    editStudent(student);
                                }}
                                style={{
                                    padding: "8px 15px",
                                    marginRight: "10px"
                                }}
                            >
                                Sửa
                            </button>

                            <button
                                onClick={function() {
                                    deleteStudent(student._id);
                                }}
                                style={{
                                    padding: "8px 15px"
                                }}
                            >
                                Xóa
                            </button>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default App;
