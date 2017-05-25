


(function ($) {
    $.feedbackTab = function (p) {
        p = $.extend
        ({
            ServiceRootPath: '',
            SucessMsg: '',

        }, p);
        var feedbackTab = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: { data: '' },
                dataType: 'json',
                baseURL: p.ServiceRootPath + 'Exam/',
                method: "",

                SucessMsg: p.SucessMsg
            },

            GetAllSubjects: function () {
                debugger;
                var webMethod = "http://localhost:49613/Exam/GetAllSubject";
                $.getJSON(webMethod, function (data) {
                    debugger;
                    $("#tblsubject").dataTable({
                        data:data,
                        columns: [
                            {'data':'subjectID'},
                            {'data':'subject_Name'},
                            { 'data': 'year' },
                            { 'data': 'programme' },
                            {'render':function(){
                                return '<button type="button" id="btnEdit" data-target="#editsubjectmodal" data-toggle="modal" class="btnEdit btn btn-success">Edit</button><button type="button" id="btnDelete" class="btnDelete btn btn-success">Delete</button>'
                            }}
                        ]
                    });
                    
                    $("#tblsubject").on('click', '.btnEdit', function () {
                        debugger;
                        var currentRow = $(this).closest("tr");
                        var subjectID = currentRow.find("td:eq(0)").text();
                        feedbackTab.EditSubjectByID(subjectID);
                    });
                    $("#tblsubject").on('click', '.btnDelete', function () {
                        debugger;
                        var currentRow = $(this).closest("tr");
                        if (confirm("Do you want to Delete?")) {
                            var subjectID = currentRow.find("td:eq(0)").text();

                            if (subjectID > 0) {
                                currentRow.hide();
                            }
                            feedbackTab.DeleteSubject(subjectID);

                        }
                        else {
                            return;
                        }
                    });

                });
    },
            AddSubjectName: function (subjectName, year,programme) {
                debugger;
                var param = JSON2.stringify({
                    subject_Name: subjectName,
                    year: year,
                    programme:programme
                });


                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "AddSubject",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function () {
                    },
                    error: function () {
                        alert("Subject Added");
                        document.getElementById("txtsubject").value = "";
                    }
                });
            },
            EditSubjectByID: function (subjectID) {
                var param = JSON2.stringify({
                    subjectID: subjectID
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "GetFromSubjectID",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        $(document).ready(function () {
                            $("#editsubjectmodal").show("modal");
                            document.getElementById("txtsubjectEdit").value = data.subject_Name;
                            document.getElementById("txtsubjectID").value = data.subjectID;
                            document.getElementById("StudentYearEdit").value = data.year;
                            document.getElementById("ProgrammeEdit").value = data.programme;
                        });
                    },
                    error: function () {

                    }


                });
            },
            UpdateSubject: function (subject_Name, subjectID, year, programme) {
                var param = JSON2.stringify({
                    subjectID: subjectID,
                    subject_Name: subject_Name,
                    year:year,
                    programme:programme
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "UpdateSubject",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function () {
                        
                    },
                    error: function () {
                        alert("Subject Updated");
                        $('#editsubjectmodal').modal('toggle');

                    }


                });
            },
            DeleteSubject: function (subjectID) {
                var param = JSON2.stringify({
                    subjectID: subjectID
                    
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "DeleteSubject",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function () {

                    },
                    error: function () {
                        alert("Subject Deleted");
                        $('#editsubjectmodal').modal('toggle');

                    }


                });
            },
            init: function () {
                var examnames;
                $(document).ready(function () {
                    
                    feedbackTab.GetAllSubjects();
                    
                });
                $("#btnAddSubject").on("click", function () {
                    debugger;
                    
                    var subjectName = $("#txtsubject").val();
                    var studentYear = $("#StudentYear").val();
                    var programme = $("#Programme").val();
                    if (subjectName == "" || studentYear == "0" || programme=="0") {
                        if (subjectName == "") {
                            $("#validsubject").text("* Required !");
                        }
                        if (studentYear == "0") {
                            $("#validyear").text("* Required !");
                        }
                        if (programme == "0") {
                            $("#spanerror").text("* Required !");
                        }
                        
                       
                    }
                    else {
                       
                        feedbackTab.AddSubjectName(subjectName,studentYear,programme);
                    }
                });

                $("#txtexam").on('keyup', function () {
                    debugger;
                    var examName = $("#txtexam").val();
                    document.getElementById("txtexamNameDisplay").text = examName;
                });
                $("#SubjectID").change(function () {
                    debugger;
                    var subjectID = $("#SubjectID").val();
                    if (subjectID == '') {

                        return;

                    }
                    else {
                        feedbackTab.GetAllQuestionBySubjectID(subjectID);
                    }



                });
                $("#btnReviewQuestions").on("click", function () {
                    debugger;
                    var examID = $("#examID").val();
                    feedbackTab.GetSelectedQuestions(examID);
                });
                $("#btnCreateExam").on('click', function () {
                    alert("Exam Created");
                    window.location.reload();
                });

                $("#btnUpdateSubject").on('click', function () {
                    var subject_Name = $("#txtsubjectEdit").val();
                    var subjectID = $("#txtsubjectID").val();
                    var year = $("#StudentYearEdit").val();
                    var programme = $("#ProgrammeEdit").val();
                    if (subject_Name==""||subjectID==""||year=="0"||programme=="0") {
                        alert("Fill The Fields !");
                    }
                    else {
                        feedbackTab.UpdateSubject(subject_Name, subjectID, year, programme);
                      
                    }
                });
            }







        };

        feedbackTab.init();

    };
    $.fn.feedback = function (p) {
        $.feedbackTab(p);
    };

})(jQuery);





