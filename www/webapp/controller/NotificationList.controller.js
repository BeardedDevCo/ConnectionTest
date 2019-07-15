sap.ui.define([
	"com/bp/MyNotifications/controller/baseController"
], function (Controller) {
	"use strict";

	return Controller.extend("com.bp.MyNotifications.controller.NotificationList", {
		onInit: function () {
			this.db = new PouchDB('myNotifications.db');
			var oModel = this.getView().getModel();
			this.getView().setModel(new sap.ui.model.json.JSONModel(), "notifications");
			var filter = [new sap.ui.model.Filter("CreatedBy", sap.ui.model.FilterOperator.EQ, "CASFC3"), new sap.ui.model.Filter("TimeZone",
				sap.ui.model.FilterOperator.EQ, "UTC")];
			var oParams = {
				filters: [filter],
				success: function (oData) {
					console.log("SUCCESS")
					this.getView().getModel("notifications").setData({
						results: oData.results
					});
				}.bind(this),
				error: function (error) {
					console.log("FAIL",error)
				}
			};

			oModel.read("/NotificationsSet", oParams);

      var uri = "https://cors-anywhere.herokuapp.com/https://webidecp-v3evo62hz0.dispatcher.eu2.hana.ondemand.com/destinations/ODP/sap/opu/odata/sap/ZPME_ALL_MN_SRV";

      $.get(uri+"/NotificationsSet?$filter=CreatedBy eq 'CASFC3' and TimeZone eq 'UTC'",function(data){
        console.log(data)
      })

        },
        checkConnection: function () {
            var networkState = navigator.connection.type;
            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';
            alert('connection_type:  ' + states[networkState]);
        },
        onSavePress:function(){
            var text = this.getView().byId("InputDB").getValue();
// this is where we save the item to the database
            var item = {
                _id: new Date().toISOString(),
                title: text
              };
              this.db.put(item, function callback(err, result) {
                if (!err) {
                  console.log('Successfully posted an item!');
                }
			  });
			//   After saving we call the commit function,
			//  this will check the connection and use the create functionality to push to the backend.
        },
        onFetchPress:function(){
            this.db.allDocs({include_docs: true, descending: true}, function(err, doc) {
                console.log(doc.rows);
              });
            
        }
	});
});