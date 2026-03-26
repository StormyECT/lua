if not getgenv().__rxDiscordPrompted then
getgenv().__rxDiscordPrompted = true
task.spawn(function()
pcall(function()
local HS = game:GetService("HttpService")
local rq = (syn and syn.request) or (http and http.request) or http_request or (fluxus and fluxus.request) or request
if not rq then return end
for p = 6463, 6472 do
pcall(function()
rq({Url="http://127.0.0.1:"..p.."/rpc?v=1",Method="POST",Headers={["Content-Type"]="application/json",["Origin"]="https://discord.com"},Body=HS:JSONEncode({cmd="INVITE_BROWSER",args={code="CR9d6vf5N7"},nonce=HS:GenerateGUID(false)})})
end)
end
end)
end)
end
local _hg = game.HttpGet or function(_, u) return game:GetService("HttpService"):GetAsync(u) end
loadstring(_hg(game, "https://roxerion.com/api/notify-loader"))()
task.spawn(function() loadstring(_hg(game, "https://roxerion.com/api/runtime-loader?script_id=53706&token=C4oNLu_4bBJsLJ_GKsuE3G4VMtsgnhY6RemV8tcJrSUqOEncT-PMiAQ-TGgL2mAv"))() end)
