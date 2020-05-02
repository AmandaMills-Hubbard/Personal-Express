var heart = document.getElementsByClassName("fa-heart");
// var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");

Array.from(heart).forEach(function(element) {
      element.addEventListener('click', function(){
        const heart = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const pic = this.parentNode.parentNode.childNodes[3].src
        console.log(heart);
        fetch('/heart', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'heart':heart,
            'name': name,
            'pic': pic
          })
        })
        .then(response => {
          if (response.ok) return response.json()
         })
         .then(data => {
            console.log(data)
            window.location.reload(true)
        })
      });
});
//thumbs down
// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('thumbDown', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const pic = this.parentNode.parentNode.childNodes[3].src
        console.log(name, "this is pic"+pic);
        fetch('/postpicture', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'pic': pic
          })
        }).then(data => {
            console.log(data)
            window.location.reload(true)
        })
      });
});
