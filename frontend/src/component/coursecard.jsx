import { useState } from "react";

function CourseCard({ name, instructor, price }) {

    const [enrolled, setEnrolled] = useState(false);

    return (
        <div className="course-card">

            <h3>{name}</h3>

            <p>Instructor: {instructor}</p>

            <p>Price: ₹{price}</p>

            {enrolled ? (
                <button>
                    ✓ Enrolled
                </button>
            ) : (
                <button onClick={() => setEnrolled(true)}>
                    Enroll Now
                </button>
            )}

        </div>
    );
}

export default CourseCard;