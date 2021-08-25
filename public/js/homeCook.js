$(document).ready(()=>{
    $("#nodal-button").click(()=>{
        $("modal-body").html("");
        $.get(`/api/courses`,(results={})=>{
            let data=results.data;
            if(!data || !data.courses) return;

            data.courses.forEach((course)=>{
                $(".modal-body").append(
                    `<div>
                    <span class="courses-cost">$${courses.cost}</span>
                    <span class="course-title">
                    ${course.title}
                    </span>
                    <button class="${course.joined?"joined-button":"join-button"} btn btn-info btn-sm" data-id="${coure._id}">
                    ${course.joined?"Joined":"Join"}
                    </button>
                    <div class="course-description">
                    ${course.description}
                    </div>
                    </div>`
                );
            });
        }).then(()=>{
            addJoinButtonListener();
        });
    });
});


let addJoinButtonListener=()=>{
    $(".join-button").click((event)=>{
        let $button=$(event.target),
        courseId=$button.data("id");
        $.get(`/api/courses/${courseId}/join`,(results={})=>{
            let data=results.data;
            if(data && data.success){
                $button
                .text("joined")
                .addClass("joined-button");
            }
            else{
                $button.text("Try again");
            }
        });
    });
}