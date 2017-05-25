


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


            //for Role List
            GetAllRoles: function () {
                debugger;
                var webMethod = "http://localhost:49613/User/GetAllRoles";
                $.getJSON(webMethod, function (data) {
                    debugger;
                    var mydata = "";
                    mydata += '<thead>';
                    mydata += '<tr>';
                    mydata += '<th>S.N.</th>';
                    mydata += '<th>UserRoleID</th>';
                    mydata += '<th>Roles</th>';
                    mydata += '<th>Action</th>';
                    mydata += '</tr>';
                    mydata += '</thead>';
                    mydata += '<tbody>';

                    $.each(data, function (i, item) {
                        debugger;



                        mydata += '<tr>';
                        mydata += '<td>' + (i + 1) + '</td>';
                        mydata += '<td>' + item.userRoleID + '</td>';
                        mydata += '<td>' + item.roles + '</td>';

                        mydata += '<td> <Button type="button" id="btnDelete" class="btnDelete btn-danger">Delete</button> </td>';
                        mydata += '</tr>';



                    });
                    mydata += '</tbody>';
                   

                    document.getElementById("tblRoleList").innerHTML = mydata;

                    $("#tblRoleList").on('click', '.btnDelete', function () {  //show modal and get user id of the current row

                        debugger;
                      
                        var currentRow = $(this).closest("tr");
                        var userRoleID = currentRow.find("td:eq(1)").text();
                        if (confirm("Are you Sure to Delete the User?")) {
                            feedbackTab.DeleteRole(userRoleID);
                        }
                        else {
                            return;
                        }



                    });



                });
            },

           
            AddRoles: function (roles) {
                debugger
                var param = JSON2.stringify({
                    roles: roles
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "AddRoles",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    success: function () {
                        alert("Role Added");
                        window.location.reload();

                    }
                });

            },

            

            DeleteRole: function (userRoleID) {
                debugger
                var param = JSON2.stringify({
                    userRoleID: userRoleID
                });
                $.ajax({
                    type: "DELETE",
                    url: feedbackTab.config.baseURL + "DeleteRole",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    success: function () {
                        alert("User Role Deleted");
                        window.location.reload();

                    }
                });
            },
            
            init: function () {
                $(document).ready(function () {

                   
                    feedbackTab.GetAllRoles();
                    
                });
                $("#btnAddRole").on('click', function () {
                    debugger;
                    var roles = $('#txtroles').val();
                    feedbackTab.AddRoles(roles);
                });
     
            }

        };

        feedbackTab.init();

    };
    $.fn.feedback = function (p) {
        $.feedbackTab(p);
    };

})(jQuery);





