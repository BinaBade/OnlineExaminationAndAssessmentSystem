


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
                baseURL: p.ServiceRootPath + 'User/',
                method: "",

                SucessMsg: p.SucessMsg
            },

            GetAllUnapprovedUsers: function () {
                debugger;
                var webMethod = "http://localhost:49613/User/GetUnaprrovedUsers";
                $.getJSON(webMethod, function (data) {
                    debugger;
                    $("#tblUnApproveList").dataTable({
                        data: data,
                        columns: [
                            { 'data': 'userID' },
                            { 'data': 'userName' },
                            { 'data': 'email' },
                            {
                                'render': function () {
                                    return '<button type="button" id="btnApprove" class="btnApprove btn btn-success">Approve</button><button type="button" id="btnDeleteUser" class="btnDeleteUser btn btn-danger">Delete</button>'
                                }
                            }
                        ]
                    });
                    

                    $("#tblUnApproveList").on('click', '.btnApprove', function () {  //show modal and get user id of the current row

                        debugger;
                        var currentRow = $(this).closest("tr");
                        var userID = currentRow.find("td:eq(0)").text();
                        feedbackTab.ApproveUserByUserID(userID);



                    });

                    $("#tblUnApproveList").on('click', '.btnDeleteUser', function () {  //show modal and get user id of the current row

                        debugger;
                        var currentRow = $(this).closest("tr");
                        var userID = currentRow.find("td:eq(0)").text();
                        if (confirm("Are you Sure to Delete the User?")) {
                            feedbackTab.DeleteUser(userID);
                        }
                        else {
                            return;
                        }



                    });
                });
            },
            ApproveUserByUserID: function (userID) {
                var param = JSON2.stringify({
                    userID: userID
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "ApproveUserByUserID",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    error: function () {
                        alert("User Approved");
                        window.location.reload();
                    }

                });
            },

      


            DeleteUser: function (userID) {
                debugger
                var param = JSON2.stringify({
                    userID: userID
                });
                $.ajax({
                    type: "DELETE",
                    url: feedbackTab.config.baseURL + "DeleteUser",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    success: function () {
                        alert("User Deleted");
                        window.location.reload();

                    }
                });
            },

            init: function () {
                $(document).ready(function () {

                    feedbackTab.GetAllUnapprovedUsers();
                });

            }
        };

        feedbackTab.init();

    };
    $.fn.feedback = function (p) {
        $.feedbackTab(p);
    };

})(jQuery);





