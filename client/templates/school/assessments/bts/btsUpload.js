import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsUpload.html';

Template.btsUpload.onCreated(function() {
    let template = this
    template.results = new ReactiveVar([])
    template.errors = new ReactiveVar(false)
    template.btsNo = new ReactiveVar("1")
    template.day = new ReactiveVar("1")
    template.subscribe("btsKeys",academicYear.get(),template.btsNo.get())
})

Template.btsUpload.helpers({
    results() {
        return Template.instance().results.get()
    }
});

Template.btsUpload.events({
    "click #save"(event,template) {
        event.preventDefault()
        if(template.results.get().length > 0 && !template.errors.get()) {
            UIBlock.block('Жүктелуде...');
            Meteor.call("BtsResults.Upload",academicYear.get(),template.btsNo.get(),template.day.get(),template.results.get(),function (err) {
                if (err) {
                    UIBlock.unblock();
                    alert(err.reason)
                } else {
                    template.results.set([])
                    UIBlock.unblock();
                    alert("Сақталды")
                }
            });
            return
        }
        alert("Файл таңдалмады немесе қателер табылды")
    },
    "change #btsNo"(event,template) {
        template.btsNo.set(event.target.value)
    },
    "change #day"(event,template) {
        template.day.set(event.target.value)
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
                    keys: txtlines[i].slice(39),
                    isValid: true
                }

                let variant = BtsAnswerKeys.findOne({variant: studObj.variant});
                if (!variant) {
                    studObj.isValid = false
                    template.errors.set(true)
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
