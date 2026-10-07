import { useEffect, useState } from "react";

function App() {
    // Danh sách sinh viên
    const [students, setStudents] = useState([]);

    // Dữ liệu form
    const [studentId, setStudentId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // URL Backend
    const API_URL =
        "https://expert-umbrella-v65pxr7946p4f66j6-5000.app.github.dev/api/students";


    // =========================
    // CÂU 47: GET danh sách sinh viên
    // =========================
    const getStudents = () => {
        fetch(API_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Không thể lấy danh sách sinh viên");
                }

                return response.json();
            })
            .then((data) => {
                setStudents(data);
            })
            .catch((error) => {
                console.error("Lỗi:", error);
            });
    };


    // =========================
    // CÂU 49: POST thêm sinh viên
    // =========================
    const addStudent = () => {

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
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                console.log("Đã thêm sinh viên:", data);

                alert("Thêm sinh viên thành công!");

                // Xóa dữ liệu trong form
                setStudentId("");
                setName("");
                setEmail("");

                // Cập nhật lại danh sách
                getStudents();
            })
            .catch((error) => {
                console.error("Lỗi:", error);
                alert("Có lỗi xảy ra khi thêm sinh viên!");
            });
    };


    // Tự động lấy danh sách khi mở trang
    useEffect(() => {
        getStudents();
    }, []);


    return (
        <div style={{
            width: "800px",
            margin: "30px auto",
            fontFamily: "Arial"
        }}>

            <h1>QUẢN LÝ SINH VIÊN</h1>


            {/* =========================
                CÂU 48: FORM NHẬP SINH VIÊN
            ========================= */}

            <h2>Thêm sinh viên</h2>

            <div>

                <input
                    type="text"
                    placeholder="MSSV"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
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
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        padding: "10px",
                        margin: "5px",
                        width: "200px"
                    }}
                />

                <br />

                <button
                    onClick={addStudent}
                    style={{
                        padding: "10px 20px",
                        margin: "10px 5px",
                        cursor: "pointer"
                    }}
                >
                    Thêm sinh viên
                </button>

            </div>


            {/* =========================
                CÂU 47: DANH SÁCH SINH VIÊN
            ========================= */}

            <h2>Danh sách sinh viên</h2>

            {students.length === 0 ? (

                <p>Chưa có sinh viên.</p>

            ) : (

                students.map((student) => (

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

                    </div>

                ))

            )}

        </div>
    );
}

export default App;
