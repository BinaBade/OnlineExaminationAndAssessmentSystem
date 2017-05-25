


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

            UpdateExam: function (examID, examName, examDuration, scheduleExam, year, programme)
            {
                var param = JSON2.stringify({
                    examID: examID,
                    examName: examName,
                    examDuration: examDuration,
                    scheduleExam: scheduleExam,
                    year: year,
                    programme:year
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "UpdateExam",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                    },
                    error: function () {
                        alert("Updated");
                        $('#editexammodel').modal('toggle');
                    }

                });
            },
            EditExamByID: function (examID) {
                var param = JSON2.stringify({
                    examID: examID
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "EditExamByID",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        $(document).ready(function () {
                            $("#editexammodel").show("modal");
                            document.getElementById("examidforupdate").value = data.examID;
                            document.getElementById("editExamName").value = data.examName;
                            document.getElementById("editDuration").value = data.examDuration;
                            var dateall = data.scheduleExam.toString().substr(0, 10);
                            var year = dateall.substr(0, 4);
                            var month = dateall.substr(5, 2);
                            var day = dateall.substr(8, 2);
                            document.getElementById("examdateedit").value = month + "/" + day + "/" + year;
                            document.getElementById("StudentYear").value = data.year;
                            document.getElementById("Programme").value = data.programme;

                        })

                    }

                });
            },
            DeactivateExam:function(examID){
                var param = JSON2.stringify({
                    examID: examID
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "DeactivateExam",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                    },
                    error: function () {

                    }


                });
            },
            ActivateExam:function(examID){
                var param = JSON2.stringify({
                    subjectiveExamID: subjectiveExamID
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "ActivateExam",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                    },
                    error: function () {
                       
                    }


                });
            },
            
            FinishExam: function (examID) {
                    var param = JSON2.stringify({
                        subjectiveExamID: subjectiveExamID
                    });
                    $.ajax({
                        type: "POST",
                        url: feedbackTab.config.baseURL + "FinishExam",
                        data: param,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                        },
                        error: function () {

                        }


                    });
                },
            RestartExam:function(examID){
            var param = JSON2.stringify({
                examID: examID
            });
            $.ajax({
                type: "POST",
                url: feedbackTab.config.baseURL + "RestartExam",
                data: param,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                },
                error: function () {
                       
                }


            });
            },
            DeleteExam: function (examID) {
                var param = JSON2.stringify({
                    examID: examID
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "DeleteExam",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                    },
                    error: function () {

                    }


                });
            },
            GetAllExams: function () {
                debugger
                $.ajax({
                    type: "GET",
                    url: feedbackTab.config.baseURL + "GetAllSubjectiveExams",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        var activebtn = '<button type="button" id="btnActive" class="btnActive btn btn-success" style="background-color:green;">Activate</button>';
                        var deactivebtn = '<button type="button" id="btnActive" class="btnActive btn btn-success" style="background-color:green;">Deactivate</button>';
                        var finishbtn = '<button type="button" id="btnFinish" class="btnFinish btn btn-warning">Finish</button>';
                        var restartbtn = '<button type="button" id="btnFinish" class="btnFinish btn btn-warning">Restart</button>';
                        var isFinished1;
                        var isActive1;
                        $("#tblExamList").dataTable({
                            data: data,
                            columns: [
                                { 'data': 'subjectiveExamID' },
                                {
                                    'data': 'subjectiveExamName'
                                },
                                {'data':'countQuestions'},
                                { 'data': 'subjectiveExamDuration',
                                'render': function (subjectiveExamDuration) {
                                    return subjectiveExamDuration + 'Minutes';
                                }
                                },
                                { 'data': 'scheduleExam',
                                'render': function (scheduleExam) {
                                    return scheduleExam.substr(0, 10);
                                }
                                },
                                { 'data': 'year' },
                                { 'data': 'programme' },
                                { 'data': 'examType' },

                                {
                                    'data': 'isActive'
                                },
                                {
                                    'data': 'isFinished'
                                    
                                },

                                {
                                    'data': 'isFinished',
                                    'render': function (data, type, full, meta) {
                                        debugger;
                                        var isActive = full.isActive;
                                        var isFinished = full.isFinished;

                                        if (isFinished == 1) {
                                            if (isActive==0) {
                                                return activebtn + restartbtn + '<button type="button" id="btnEdit" data-target="#editexammodel" data-toggle="modal" class="btnEdit btn btn-primary">Edit</button><button type="button" id="btnDelete" class="btnDelete btn btn-danger">Delete</button>'
                                            }
                                            if (isActive==1) {
                                                return deactivebtn + restartbtn + '<button type="button" id="btnEdit" data-target="#editexammodel" data-toggle="modal" class="btnEdit btn btn-primary">Edit</button><button type="button" id="btnDelete" class="btnDelete btn btn-danger">Delete</button>'
                                            }
                                            
                                        }
                                        if (isFinished==0) {
                                            if (isActive == 0) {
                                                return activebtn + finishbtn + '<button type="button" id="btnEdit" data-target="#editexammodel" data-toggle="modal" class="btnEdit btn btn-primary">Edit</button><button type="button" id="btnDelete" class="btnDelete btn btn-danger">Delete</button>'
                                            }
                                            else {
                                                return deactivebtn + finishbtn + '<button type="button" id="btnEdit" data-target="#editexammodel" data-toggle="modal" class="btnEdit btn btn-primary">Edit</button><button type="button" id="btnDelete" class="btnDelete btn btn-danger">Delete</button>'
                                            }
                                        }
                                        
                                    }
                                }
                            ]
                        });
                        //$('#tblquestions').find('tr').click(function () {
                        //    debugger;

                        //    var currentRow = $(this).closest("tr");
                        //    var questionID = currentRow.find("td:eq(1)").text();

                        //    if (questionID > 0) {
                        //        currentRow.hide();
                        //        feedbackTab.AddQuestionsInExam(questionID);
                        //    }



                        //});

                        $("#tblExamList").on('click', '.btnEdit', function () {  //show modal and get user id of the current row
                            var currentRow = $(this).closest("tr");
                            var examID = currentRow.find("td:eq(0)").text();
                            feedbackTab.EditExamByID(examID);
                        });
                        $("#tblExamList").on('click', '.btnActive', function () {  //show modal and get user id of the current row
                            var currentRow = $(this).closest("tr");
                            var examID = currentRow.find("td:eq(0)").text();
                            if ($(this).text() == "Activate") {
                                feedbackTab.ActivateExam(examID);
                                debugger;

                                $(this).html('Deactivate');
                            }
                            else {
                                feedbackTab.DeactivateExam(examID);
                                $(this).html('Activate');
                            }
                        });
                        $("#tblExamList").on('click', '.btnFinish', function () {  //show modal and get user id of the current row
                            var currentRow = $(this).closest("tr");
                            var examID = currentRow.find("td:eq(0)").text();
                            if ($(this).text() == "Finish") {
                                feedbackTab.FinishExam(examID);
                                debugger;
                                $(this).html('Restart');
                            }
                            else {
                                feedbackTab.RestartExam(examID);
                                $(this).html('Finish');
                            }
                            
                        });
                        $("#tblExamList").on('click', '.btnDelete', function () {  //show modal and get user id of the current row
                           
                            var currentRow = $(this).closest("tr");
                            var examname = currentRow.find("td:eq(1)").text();
                            if (confirm("Do you want to Delete"+examname)) {
                                var examID = currentRow.find("td:eq(0)").text();
                                if (examID > 0) {
                                    currentRow.hide();
                                }
                                feedbackTab.DeleteExam(examID);
                            }
                            else {
                                return;
                            }
                            
                        });

                    }

                });



            },
            init: function () {
                debugger;
                feedbackTab.GetAllExams();
                $(document).ready(function () {
                    $('#examdateedit').datepicker({
                    });
                });

                $("#btnUpdateExam").on('click', function () {
                    debugger;
                    var examID = $('#examidforupdate').val();
                    var examName = $('#editExamName').val();
                    var examDuration = $('#editDuration').val();
                    var dates = $('#examdateedit').val();
                    var year = dates.substr(6, 4);
                    var month = dates.substr(0, 2);
                    var day = dates.substr(3, 2);
                    var scheduleExam = year + "-" + month + "-" + day;
                    var year = $('#examdateedit').val();
                    var programme = $('#Programme').val();

                    feedbackTab.UpdateExam(examID,examName,examDuration,scheduleExam,year,programme);
                        });


            }








        };

        feedbackTab.init();

    };
    $.fn.feedback = function (p) {
        $.feedbackTab(p);
    };

})(jQuery);





