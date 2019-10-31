$(document).ready(function () {
    //1.get instargram.json
    $("#search_hashtag").keypress(function () {
        var hashtag = $("#hashtag").val()
        console.log(hashtag);
        $("#post").empty();
        $.get(`https://www.instagram.com/explore/tags/${hashtag}/?__a=1`, function (data, status) {
            console.log(status);
            if (status === 'success') {

                //console.log(data);
                var location = data.graphql.hashtag
                var name = location.name
                $("#location").text(name)
                var edge_location_to_top_posts = location.edge_hashtag_to_media
                var count = edge_location_to_top_posts.count
                $("#noofpost").text(count + ` posts`)

                var edges = edge_location_to_top_posts.edges

                edges.forEach(element => {
                    var post = element.node
                    var dimensions = post.dimensions
                    var height = dimensions.height
                    var width = dimensions.width
                    var display_url = post.display_url
                    var liked = post.edge_liked_by.count
                    var caption = post.edge_media_to_caption.edges[0].node.text
                    var comments = post.edge_media_to_comment.count
                    var item = `<div class="col-4" ><div style="background-image:url('${display_url}'); height:290px;
                background-position: center; background-repeat: no-repeat; background-size: auto 100%; ">
                </div><p><b>Liked</b>&nbsp;${liked} <b>Comments</b>&nbsp;${comments}</p>
                <div class="card" style=" width:100%; border:none;">${caption}</div></div>`
                    $("#post").append(item)
                });

            }
        });

    });


});