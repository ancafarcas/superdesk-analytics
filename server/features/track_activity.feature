Feature: Track Activity

     @auth
     Scenario: Track activity items
        Given "desks"
        """
        [{"name": "Sports Desk"}]
        """
        Given "archive"
		"""
		[{
			"_id": "xyz",
			"guid": "item1",
			"type": "text",
			"headline": "item1",
			"_current_version": 1,
			"state": "fetched",
		    "task": {"desk": "#desks._id#", "stage": "#desks.incoming_stage#", "user": "#CONTEXT_USER_ID#"},
		    "subject":[{"qcode": "05007000", "name": "sub"}],
			"_updated": "2017-01-02T09:03:26+0000",
		    "body_html": "Test Document"
		}]
		"""
		When we get "/archive/xyz?version=all"
		Then we get Ok response
		Then we get existing resource
         """
         {"guid": "item1"}
         """
		When we post to "/track_activity_report"
        """
        {
        	"user": "#CONTEXT_USER_ID#",
        	"desk": "#desks._id#",
        	"stage": "#desks.incoming_stage#"
        }
        """
        Then we get existing resource
        """
        {
        "user": "#CONTEXT_USER_ID#",
        "report": [{"entered_stage_at": "_updated"}]
        }
        """
 