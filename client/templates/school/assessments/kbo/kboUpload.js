import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './kboUpload.html';

Template.kboUpload.onCreated(function() {
    let template = this
    template.results = new ReactiveVar([])
    template.kboNo = new ReactiveVar("1")
    template.subscribe("kboSubjects")
    template.subscribe("kboKeys",academicYear.get(),template.kboNo.get())
})

Template.kboUpload.helpers({
    results() {
        return Template.instance().results.get()
    }
});

Template.kboUpload.events({
    "click #save"(event,template) {
        event.preventDefault()
        if(template.results.get().length > 0) {
            Meteor.call("KboResults.Upload",academicYear.get(),template.kboNo.get(),template.results.get(),function (err) {
                if (err) {
                    alert(err.reason)
                } else {
                    template.results.set([])
                    alert("Сақталды")
                }
            })
            return
        }
        alert("Файл таңдалмады")
    },
    "chamge #kboNo"(event,template) {
        template.kboNo.set(event.target.value)
    },
    "change #file"(event,template) {
        function handleFiles(files) {
            // Check for the various File API support.
            if (window.FileReader) {
                // FileReader are supported.
                getAsText(files[0]);
            } else {
                alert('FileReader are not supported in this browser.');
            }
        }

        function getAsText(fileToRead) {
            var reader = new FileReader();
            // Read file into memory as UTF-8
            reader.readAsText(fileToRead);
            // Handle errors load
            reader.onload = loadHandler;
            reader.onerror = errorHandler;
        }

        function loadHandler(event) {
            var txt = event.target.result;
            processData(txt);
        }

        function processData(csv) {
            var txtlines = csv.split(/\r\n|\n/);
            var res = [];
            for (var i=0; i<txtlines.length; i++) {
                if (txtlines[i] != "") {
                let studObj = {
                    studentId: txtlines[i].slice(3,8),
                    variant: txtlines[i].slice(8,12),
                    name: txtlines[i].slice(12,29),
                    surname: txtlines[i].slice(29,39),
                    keys: txtlines[i].slice(39)
                }
                res.push(studObj);
                }
            }
            template.results.set(res)
        }

        function errorHandler(evt) {
            if(evt.target.error.name == "NotReadableError") {
                alert("Can not read file!");
            }
        }

        handleFiles(event.target.files)
    }
})
