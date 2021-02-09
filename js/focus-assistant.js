this._spaceElement =
  this._spaceElement || $('<div></div>', { class: 'space-element' });

$(function () {
  const assistant = $('[form-assistant]');

  setFocusInput = (inputElement) => {
    const { left, top } = $(inputElement).closest('div').position();
    const width = $(inputElement).closest('div').innerWidth();
    const height = $(inputElement).closest('div').outerHeight(true);

    $(inputElement)
      .closest('div')
      .toggleClass('focus-assistant')
      .css({
        top: top - 16,
        left: left - 16,
        width: width + 32,
        height: height + 32,
        padding: 16,
      });

    this._spaceElement =
      this._spaceElement || $('<div></div>', { class: 'space-element' });

    this._spaceElement.height(height);

    $(inputElement).closest('div').after(this._spaceElement);
    $(inputElement).focus();
  };

  setFocusButton = (formAssistant) => {
    const button = $(formAssistant).find('button')[0];

    const { left, top } = $(button).closest('div').position();
    const width = $(button).closest('div').innerWidth();
    const height = $(button).closest('div').outerHeight(true);

    $(button)
      .closest('div')
      .toggleClass('focus-assistant')
      .toggleClass('button-assistant')
      .css({
        top: top - 16,
        left: left - 16,
        width: width + 32,
        height: height + 32,
        padding: 16,
      });

    this._spaceElement =
      this._spaceElement || $('<div></div>', { class: 'space-element' });

    this._spaceElement.height(height);

    $(button).closest('div').after(this._spaceElement);
    $(button).focus();
  };

  assistant.each((index, element) => {
    const input = $(element)
      .find(':input')
      .not(
        ':input[type=button], :input[type=submit], :input[type=reset], :input[type=hidden]'
      );

    input.each((j, obj) => {
      $(obj).attr('input-assistant-no', j + 1);
    });

    const inputNumber = $(input).length;
    $(element).attr('data-input', inputNumber);

    setFocusInput(input[0]);

    const button = $(element).find('button');

    button.closest('div').attr('data-button', button.length);
    button.each((j, button) => {
      $(button).attr('button-assistant-no', j + 1);
    });
  });

  $('[form-assistant]').on('keypress', '[input-assistant]', (e) => {
    if (e.which == 13) {
      if (!$(e.target).val() || $(e.target).val().length <= 0) return;

      const inputIndex = parseInt($(e.target).attr('input-assistant-no'));

      const inputLength = parseInt(
        $(e.target).closest('[form-assistant]').attr('data-input')
      );

      $(e.target).closest('div').css({
        top: '',
        left: '',
        width: '',
        height: '',
        padding: '',
      });

      $(e.target).closest('div').removeClass('focus-assistant');
      this._spaceElement && $(this._spaceElement).remove();

      const form = $(e.target).closest('[form-assistant]');

      if (inputIndex !== inputLength) {
        const nextInput = form.find(`[input-assistant-no=${inputIndex + 1}]`);
        setFocusInput(nextInput);
      } else {
        setFocusButton(form);
      }
    }
  });

  $('[form-assistant]').on('keydown', '.button-assistant', function (e) {
    const buttonIndex = parseInt($(e.target).attr('button-assistant-no'));
    const buttonNumber = parseInt($(e.target).closest('div').data('button'));

    if (e.keyCode === 38) {
      if (buttonIndex !== 0)
        $(`[button-assistant-no=${buttonIndex - 1}]`).focus();
    }

    if (e.keyCode === 40) {
      if (buttonIndex < buttonNumber)
        $(`[button-assistant-no=${buttonIndex + 1}]`).focus();
    }
  });
});
