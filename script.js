/*
Name: Base Converter
    Author: Daniel Goldstein
    T.Z - 333877348
*/

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements from the DOM
    const fromButtons = document.querySelectorAll('.from-btn');
    const toButtons = document.querySelectorAll('.to-btn');
    const numberInput = document.getElementById('number-input');
    const convertBtn = document.getElementById('convert-btn');
    const resultDisplay = document.getElementById('result');
    
    // Set default values
    let fromBase = 10; // Dec
    let toBase = 16;   // Hexa
    
    // Add click event listeners to FROM buttons
    fromButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            fromButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set the fromBase based on which button was clicked
            if (this.id === 'from-binary') {
                fromBase = 2;
            } else if (this.id === 'from-octal') {
                fromBase = 8;
            } else if (this.id === 'from-decimal') {
                fromBase = 10;
            } else if (this.id === 'from-hex') {
                fromBase = 16;
            }
        });
    });
    
    // Add click event listeners to TO buttons
    toButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            toButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set the toBase based on which button was clicked
            if (this.id === 'to-binary') {
                toBase = 2;
            } else if (this.id === 'to-octal') {
                toBase = 8;
            } else if (this.id === 'to-decimal') {
                toBase = 10;
            } else if (this.id === 'to-hex') {
                toBase = 16;
            }
        });
    });
    
    // Add click event to convert button
    convertBtn.addEventListener('click', function() {
        convertNumber();
    });
    
    // Add keypress event to input field
    numberInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            convertNumber();
        }
    });
    
    // Function to check if input is valid for the base that we choose
    function isValidInput(input, base) {
        if (input === '') {
            return false;
        }
        let validChars;
        if (base === 2) {
            validChars = /^[01]+$/;
        } else if (base === 8) {
            validChars = /^[0-7]+$/;
        } else if (base === 10) {
            validChars = /^[0-9]+$/;
        } else if (base === 16) {
            validChars = /^[0-9A-Fa-f]+$/;
        }
        
        return validChars.test(input);
    }
    
    // Function to get base name
    function getBaseName(base) {
        if (base === 2) return "Binary";
        if (base === 8) return "Octal";
        if (base === 10) return "Decimal";
        if (base === 16) return "Hexadecimal";
        return "";
    }
    
    // Function to convert the number
    function convertNumber() {
        // Get the input value
        const input = numberInput.value.trim();
        
        // Check if input is empty
        if (input === '') {
            window.alert('Please enter a number');
            return;
        }
        
        // Check if input is valid for the selected base
        if (!isValidInput(input, fromBase)) {
            const baseName = getBaseName(fromBase);
            window.alert(`Invalid input for ${baseName} (base ${fromBase}). Please enter a valid ${baseName} number.`);
            return;
        }
        
        try {
            // Convert from source base to decimal
            const decimal = parseInt(input, fromBase);
            
            // Convert from decimal to target base
            let result = decimal.toString(toBase);
            
            // Display the result with base subscripts
            let fromSymbol = getBaseSymbol(fromBase);
            let toSymbol = getBaseSymbol(toBase);
            resultDisplay.textContent = `Result: ${input}${fromSymbol} = ${result}${toSymbol}`;
            
            // Clear the input field
            numberInput.value = '';
            
        } catch (error) {
            window.alert('Error during conversion: ' + error.message);
        }
    }
    
    // Function to get base symbol
    function getBaseSymbol(base) {
        if (base === 2) return '₂';
        if (base === 8) return '₈';
        if (base === 10) return '₁₀';
        if (base === 16) return '₁₆';
        return '';
    }
});
