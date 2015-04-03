Template.tastingEdit.events({

  'submit form': function (evt) {
    evt.preventDefault();

    var currentTastingId = this._id;

    var tastingProperties = {
      when: moment($(evt.target).find('[name=when]').val()).toDate(),
      where: $(evt.target).find('[name=where]').val(),
      bottle: $(evt.target).find('[name=bottle]').val(),
      spirit: $(evt.target).find('[name=spirit]').val(),
      teaser: $(evt.target).find('[name=teaser]').val()
    };

    Tastings.update(currentTastingId, {$set: tastingProperties}, function (err) {
      if (err) {
        // display the error to the user
        throwError(err.reason);
      } else {
        Router.go('tastingPage', {
          _id: currentTastingId
        });
      }
    });
  },

  'click .delete': function (evt) {
    evt.preventDefault();

    if (confirm('Delete this tasting?')) {
      var currentTastingId = this._id;
      Tastings.remove(currentTastingId);
      Router.go('tastingsNext');
    }
  }

});

Template.tastingEdit.rendered = function () {
  $('.datetimepicker').datetimepicker();
};
