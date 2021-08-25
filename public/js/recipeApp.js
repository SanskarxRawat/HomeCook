$.get("/api/courses",(results={})=>{
    let data=results.data;
    if(!data || data.courses) return;
    data.courses.forEach((course)=>{
        $(".modal-body").append(
            `<div>
            <span class="courses-title">
            ${course.title}
            </span>
            <div class='course-description'>
            ${course.description}
            </div>
            </div>`
        );
    });
});


$(document).ready(()=>{
    $("#modal-button").click(()=>{
        $(".modal-body").html("");
        $.get("/api/courses",(results={})=>{
            let data=results.data;
            if(!data || !data.courses) return;
            data.courses.forEach((course)=>{
                $(".modal-body").append(
                    `<div>
                    <span class="course-title">
                    ${course.title}
                    </span>
                    <button class="joined-button" data-id="${course._id}">
                    Join
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
        $.get('/api/courses/${courseId}/join',(result={})=>{
            let data=results.data;
            if(data && data.success){
                $button
                .text("Joined")
                .addClass("joined-button")
                .removeClass("join-button");
            }
            else{
                $button.text("Try again");
            }
        });
    });
}


const socket=io();

$("#chatForm").submit(()=>{
    socket.emit("message");
    $("#chat-input").val("");
    return false;
});

socket.on("message",(message)=>{
    displayMessage(message.content);
});

let displayMessage=(message)=>{
    $("#chat").prepend($("<li>").html(`
    <strong class="message ${getCurrentUserClass( 
         message.user )}">
    ${message.userName}
    </strong>: ${message.content}
    `));
    
};

let  getCurrentUserClass=(id)=>{
    let userId=$("#chat-user-id").val();
    return userId===id?"current-user":"";
};



$("#chatFrom").submit(()=>{
    let text=$("#chat-input").val(),
    userName=$("#chat-user-name").val(),
    userId=$("#chat-user-id").val();
    socket.emit("message",{
        content:text,
        userId:userId,
        userId:userId
    });
    $("#chat-input").val("");
    return false;
});

socket.on("load all messages",(data)=>{
    data.forEach(message=>{
        displayMesssage(message);
    });
});

socket.on("message",(message)=>{
    displayMessage(message);
    for(let i=0;i<2;i++){
        $(".chat-icon").fadeOut(200).fadeIn(200);
    }
});


socket.on("user disconnected",()=>{
    displayMessage({
        userName:"Notice",
        content:"User left the chat"
    });
});


<button class='${course.joined ? "joined-button":"joined-button"}' data id="${course._id}">
    ${course.joined?"Joined":"Join"}
</button>