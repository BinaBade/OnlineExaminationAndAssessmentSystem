


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


            ResultPublish: function (examID, examName, year, programme) {
                var param = JSON2.stringify({
                    examID: examID,
                    examName: examName,
                    year: year,
                    programme: programme
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "PublishSubjectiveResult",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                    },
                    error: function () {

                    }


                });
            },
            GetFinishedExam: function () {
                debugger
                $.ajax({
                    type: "GET",
                    url: feedbackTab.config.baseURL + "GetFinishedSubjectiveExams",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        var activebtn = '<button type="button" id="btnPublish" class="btnPublish btn btn-success" style="background-color:blue;">Publish Result</button>';
                        $("#tblFinishedExamList").dataTable({
                            data: data,
                            columns: [
                                { 'data': 'subjectiveExamID' },
                                {
                                    'data': 'subjectiveExamName'
                                },
                                { 'data': 'year' },
                                { 'data': 'programme' },
                                {
                                    'render': function () {
                                        return activebtn;
                                    }
                                }
                            ]
                        });


                        $("#tblFinishedExamList").on('click', '.btnPublish', function () {
                            debugger;
                            var currentRow = $(this).closest("tr");
                            var examID = currentRow.find("td:eq(0)").text();
                            var examName = currentRow.find("td:eq(1)").text();
                            var year = currentRow.find("td:eq(2)").text();
                            var programme = currentRow.find("td:eq(3)").text();


                            $(this).css('background-color', 'green');
                            $(this).attr('disabled', 'disabled');
                            $(this).html('Done');
                            feedbackTab.ResultPublish(examID, examName, year, programme);

                        });


                    }

                });



            },
            init: function () {
                debugger;
                feedbackTab.GetFinishedExam();
                $(document).ready(function () {
                    $('#examdateedit').datepicker({
                    });
                });


            }








        };

        feedbackTab.init();

    };
    $.fn.feedback = function (p) {
        $.feedbackTab(p);
    };

})(jQuery);





