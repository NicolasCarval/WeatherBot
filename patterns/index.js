const patternDict = [
    {
        pattern: '\\b(?<greetings>[Hh](i|ello|ey|ola))\\b',
        intent: 'Hello'
    },
    {
        pattern: '\\b(?<goodbye>[Bb]ye|[Ee]xit)\\b',
        intent: 'Exit'
    }, {
        pattern: '[Cc]an (you|u) do|[hH]elp',
        intent: 'Chatbot competence'
    },
    {
        pattern: '[Ww]ind( like)? in (?<city>([A-Za-z]+) ?([A-Z]{1}[a-z]+)?)',
        intent: 'Wind'
    },
    {
        pattern: '(?<meteo>[Rr]ainy|[Ss]unny) in (?<city>([A-Za-z]+) ?([A-Z]{1}[a-z]+)?) (?<time>today|tomorrow|the day after tomorrow)',
        intent: 'question rainy sunny'
    },
    {
        pattern: '(uv-level|uv level|[Uu][vV]|Should [iI]).* in (?<city>([A-Za-z]+) ?([A-Z]{1}[a-z]+)?)',
        intent: 'Solar cream'
    },
    {
        pattern: '(?<temperature> cold|hot) in (?<city>([A-Za-z]+) ?([A-Z]{1}[a-z]+)?) (?<time>today|tomorrow)',
        intent: 'question hot or cold'
    },
    {
        pattern:'([Ww]hat|[Hh]ow|[Ww]eather).* [Ii]n (?<city>([A-Za-z]+) ?([A-Z]{1}[a-z]+)?) (?<time>[Tt]omorrow|[Nn]ext week|[Dd]ay)',
        intent: 'tomorrow weather'
    },
    {
        pattern:'([Ww]hat|[Hh]ow|[Ww]eather).* in (?<city>([A-Za-z]+) ?([A-Z]{1}[a-z]+)?)',
        intent: 'current weather'
    }


];

module.exports=patternDict;