package com.example.Furia.Controller;

import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
public class ChatBotController {

private final VertexAiGeminiChatModel chatModel;

public ChatBotController(VertexAiGeminiChatModel chatModel){
    this.chatModel=chatModel;
}

@GetMapping("/chat")
public String Chat(@RequestParam(value = "query", defaultValue = "Quem é o técnico da FURIA?") String query) {
    String hltvInfo = fetchHLTVInfo();

    var messages = List.of(
        new SystemMessage("""
            \n Você é um assistente especializado na organização brasileira de e-sports FURIA.
            Sempre inclua ao final da resposta os links oficiais da organização:
            
            Redes sociais da FURIA:
            - Twitter/X: https://twitter.com/furia
            - Instagram: https://www.instagram.com/furiagg
            - YouTube: https://www.youtube.com/@FURIA
            
            Página da FURIA na HLTV: https://www.hltv.org/team/8297/furia
            
            Informações adicionais da HLTV:
            """ + hltvInfo),
        new UserMessage(query)
    );

    var prompt = new Prompt(messages.stream()
        .map(message -> (org.springframework.ai.chat.messages.Message) message)
        .toList());

    return chatModel.call(prompt)
            .getResult()
            .getOutput()
            .getText();
}
public String fetchHLTVInfo() {
    try {
        Document doc = Jsoup.connect("https://www.hltv.org/team/8297/furia").get();

        
        String title = doc.title();

        return "Título da página HLTV: " + title;
    } catch (Exception e) {
        return "Não foi possível buscar informações da HLTV.";
    }
}

}
