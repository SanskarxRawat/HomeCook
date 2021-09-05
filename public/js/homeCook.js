$(document).ready(()=>{
    $("#modal-button").click(()=>{
        $(".modal-body").html("");
        $.get("/api/courses",(result={})=>{
            let data=result.data;
            if(!data || !data.courses) return;
            data.courses.forEach((course)=>{
                $(".modal-body").append(
                    `
                    <div>
                        <span class="course-cost" >$${course.cost}</span>
                        <span class="course-title" >
                        ${course.title}
                        </span>
                        <button style="color:black;" class="${course.joined ? "joined-button" : "join-button"} btn btn-info btn-sm" data-id="${course._id}" >
                        ${course.joined ? "Joined" : "Join"}
                        </button>
                        <div class="course-description" >
                        Description : ${course.description}
                        </div>
                    </div>
                `
                );
            });
        }).then(()=>{
            addJoinButtonListener();
        }).then(()=>{
            $("#myModal").css('display','block');
        });
    });
    $(".btn").click(function(){
        $("#mymodal").css('display','none');
    });
});

let addJoinButtonListener=()=>{
    $(".join-button").click((event)=>{
        let $button=$(event.target),
        courseId=$button.data("id");
        $.get('/api/courses/${courseId}/join',(result={})=>{
            let data=result.data;
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
};


const socket=io();

$("#chatForm").submit(()=>{
   let text=$("#chat-input").val(),
   userName=$("#chat-user-name").val(),
   userId=$("#chat-user-id").val();
   socket.emit("message",{
       content:text,
       userId:userId,
       userName:userName
   });
   $("#chat-input").val("");
   return false;
});

socket.on("message",(message)=>{
    displayMessage(message.content);
    setTimeout(()=>{
        $(".notification-count").text("2");
    },4000);
});

socket.on("Load all messages",(data)=>{
    data.forEach(message=>{
        displayMessage(message);
    });
});


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

socket.on("user disconnected",()=>{
    let userName=$("#chat-user-name");
    displayMessage({
        userName:userName,
        content:"User left the chat!!!"
    });
});

let displayMessage=(message)=>{
    $(".chat-list").prepend($("<li>").html(
        `
        <li class="in>
            <div class="chat-img">
            <img alt="Avatar" src="">
            </div>

            <div class="chat-content>
                <div class="chat-message>
                    <h5>${message.userName}</h5>
                    <p>${message.content}</p>
                </div>
            </div>
        </li>
        `
    ));
};

let getCurrentUserClass=(id)=>{
    let userId=$("chat-user-id").val();
    if(userId===id) return "current-user";
    else return "";
};
