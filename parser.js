

export function parser(file,tokens) {
    let token = null;
    function next() {
        token = tokens.next().value;
    }

    function NumericLiteral() {
        if (token.type === "NumericLiteral") {
            const _token = token;
            next();
            return _token;

        }
    }

    function PlusToken(){
        if(token.type === "PlusToken"){
            const _token = token;
            next();
            return _token;
        }

        return null;
    }

    function MulToken(){
        if(token.type === "MulToken"){
            const _token = token;
            next();
            return _token;
        }

        return null;
    }

    function DivToken(){
        if(token.type === "DivToken"){
            const _token = token;
            next();
            return _token;
        }

        return null;
    }

    function BinaryExpression(){
        const head = NumericLiteral();
        if(!head) return null;

        return PlusExpression(MulExpression(head));
        
    }

    function MulExpression(left){
        const operator = MulToken() || DivToken();
        if(!operator) return left;
        const right = NumericLiteral();
        if(!right) {
            throw new SyntaxError(`Expected token type "NumericLiteral" got ${token.type} at ${file}:${token.loc.start.line}:${token.loc.start.column}`);
        }

        const node = {
            type: 'BinaryExpression',
            left,
            operatorToken: operator,
            right
        }

        return MulExpression(node);
    }

    function PlusExpression(left){
        const operator = PlusToken();
        if(!operator) return left;
        const next = NumericLiteral();
        if(!next) {
            throw new SyntaxError(`Expected token type "NumericLiteral" got ${token.type} at ${file}:${token.loc.start.line}:${token.loc.start.column}`);
        }

        const right = MulExpression(next);

        const node = {
            type: 'BinaryExpression',
            left,
            operatorToken: operator,
            right
        }

        return PlusExpression(node);
    }

    next();
    const program = BinaryExpression();
    if(token.type !== 'EndOfFileToken'){
        throw new SyntaxError(`Expected token type "EndOfFileToken" got ${token.type} at ${file}:${token.loc.start.line}:${token.loc.start.column}`);
    }
    return program;
}