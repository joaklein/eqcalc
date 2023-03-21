document.querySelector("#calc").onclick = doCalc

function doCalc() {
    let charClass = document.querySelector("#charClass").value
    let charLevel = document.querySelector("#charLevel").value
    let charStr = document.querySelector("#charStr").value
    let charHaste = document.querySelector("#charHaste").value
    let skillDW = document.querySelector("#skillDW").value
    let skillDA = document.querySelector("#skillDA").value
    let skillOff = document.querySelector("#skillOff").value
    let skillBS = document.querySelector("#skillBS").value
    let mhDmg = document.querySelector("#mhDmg").value
    let mhDelay = document.querySelector("#mhDelay").value
    let ohDmg = document.querySelector("#ohDmg").value
    let ohDelay = document.querySelector("#ohDelay").value
    let thBonus = document.querySelector("#thBonus").value

    let dmgMod = getDmgMod()
    let dmgBonus = getDmgBonus()
    let hasteCap = getHasteCap()
    let dwChance = getDwChance()
    let daChance = getDaChance()
    let taChance = getTaChance()

    let mhDmgCapO = getDmgCap(mhDmg)
    let mhMinO = getMainMin()
    let mhMaxO = getMainMax()
    let mhDelayO = getWepDelay(mhDmg, mhDelay)
    let mhDpsO = getMainDPS()

    let ohDmgCapO = getDmgCap(ohDmg)
    let ohMinO = getOffMin()
    let ohMaxO = getOffMax()
    let ohDelayO = getWepDelay(ohDmg, ohDelay)
    let ohDpsO = getOffDPS()

    let ttlDpsO = getTtlDPS()

    let maxBS = getMaxBS()

    document.querySelector("#dmgMod").value = dmgMod
    document.querySelector("#dmgBonus").value = dmgBonus
    document.querySelector('#hasteCap').value = `${(hasteCap * 100)}%`
    document.querySelector("#dwChance").value = `${(dwChance * 100).toFixed(2)}%`
    document.querySelector("#daChance").value = `${(daChance * 100).toFixed(2)}%`
    document.querySelector("#taChance").value = `${(taChance * 100).toFixed(2)}%`

    document.querySelector("#mhDmgCapO").value = mhDmgCapO
    document.querySelector("#mhMinO").value = mhMinO
    document.querySelector("#mhMaxO").value = mhMaxO
    document.querySelector("#mhDelayO").value = mhDelayO
    document.querySelector("#mhDpsO").value = mhDpsO

    document.querySelector("#ohDmgCapO").value = ohDmgCapO
    document.querySelector("#ohMinO").value = ohMinO
    document.querySelector("#ohMaxO").value = ohMaxO
    document.querySelector("#ohDelayO").value = ohDelayO
    document.querySelector("#ohDpsO").value = ohDpsO

    document.querySelector("#ttlDpsO").value = ttlDpsO

    document.querySelector("#maxBS").value = maxBS

    function getDmgBonus() {
        let bonus

        if (charLevel < 28) {
            bonus = 0
        } else if (thBonus > 0) {
            bonus = thBonus
        } else if (charClass == "Bard" || charClass == "Monk" || charClass == "Paladin" || charClass == "Ranger" ||
            charClass == "Rogue" || charClass == "Shadow Knight" || charClass == "Warrior") {
            bonus = (charLevel - 25) / 3
        } else {
            bonus = 0
        }

        return Math.floor(bonus)
    }

    function getDmgMod() {
        let dmgMod = (parseFloat(skillOff) + parseFloat(charStr)) / 100
        return dmgMod
    }

    function getWepDelay(wepDmg, wepDelay) {
        let delay
        haste = charHaste * .01

        if (wepDmg == 0 || wepDmg == '') {
            return delay = 0
        }

        if (charLevel < 31 && haste > .5) {
            haste = .5
        } else if (charLevel < 51 && haste > .74) {
            haste = .74
        } else if (charLevel < 60 && haste > .94) {
            haste = .94
        } else if (charLevel >= 60 && haste > 1) {
            haste = 1
        }

        delay = wepDelay / (1 + haste)

        if (delay < 5) {
            delay = 5
        }

        delay = Math.round(delay)
        return delay
    }

    function getHasteCap() {
        if (charLevel < 31) {
            haste = .5
        } else if (charLevel < 51) {
            haste = .74
        } else if (charLevel < 60) {
            haste = .94
        } else if (charLevel >= 60) {
            haste = 1
        }
        return haste
    }

    function getDwChance() {
        let dwChance

        if (charClass == "Monk") {
            dwChance = (parseFloat(charLevel) + parseFloat(skillDW)) / 400
        } else {
            dwChance = (parseFloat(charLevel) + parseFloat(skillDW)) / 500
        }

        return dwChance
    }

    function getDaChance() {
        let daChance = skillDA / (400 * 1.05)
        return daChance
    }

    function getTaChance() {
        let taChance

        if (charLevel >= 60 && charClass == "Monk") {
            taChance = (skillDA / 2) / (400 * 1.05)
        } else if (charLevel >= 60 && charClass == "Warrior") {
            taChance = (skillDA / 2) / (400 * 1.05)
        } else {
            taChance = 0
        }

        return taChance
    }

    function getMainDPS() {
        let dps

        dps = ((mhMinO + mhMaxO) / 2) / (mhDelayO * .1)
        return dps.toFixed(2)
    }

    function getOffDPS() {
        let dps

        dps = (((ohMinO + ohMaxO) / 2) / (ohDelayO * .1)) * dwChance

        if (ohMinO == 0) {
            dps = 0
        }

        return dps.toFixed(2)
    }

    function getTtlDPS() {
        let totalDPS

        if (skillDW < 150) {
            totalDPS = parseFloat(mhDpsO) + (parseFloat(mhDpsO) * parseFloat(daChance)) + parseFloat(ohDpsO)
        } else {
            totalDPS = parseFloat(mhDpsO) + (parseFloat(mhDpsO) * parseFloat(daChance)) + parseFloat(ohDpsO) + (parseFloat(ohDpsO) * parseFloat(daChance))
        }

        if (charClass == "Warrior" || charClass == "Monk") {
            if (charLevel >= 60) {
                totalDPS += parseFloat(mhDpsO) * parseFloat(taChance)
            }
        }

        return totalDPS.toFixed(2)
    }

    function getMainMax() {
        let mainMax

        if (dmgMod < 2) {
            dmgMod = 2
        }

        if (thBonus > 0) {
            dmgBonus = thBonus
        }

        mainMax = (mhDmg * dmgMod) + parseFloat(dmgBonus)
        mainMax = Math.floor(mainMax)
        return mainMax
    }

    function getMainMin() {
        let mainMin = dmgBonus + 1
        return mainMin
    }

    function getOffMin() {
        let offMin

        if (ohDmg == 0) {
            offMin = 0
        } else {
            offMin = 1
        }

        return offMin
    }

    function getOffMax() {
        let offMax = Math.floor(ohDmg * dmgMod)
        return offMax
    }

    function getMaxBS() {
        let maxBS
        let strUnder
        let strOver = 0

        if (charStr > 200) {
            strUnder = 200
            strOver = 255 - charStr
        } else {
            strUnder = charStr
        }

        maxBS = ((parseFloat(skillOff) + parseFloat(strUnder)) + (parseFloat(strOver) / 5)) * parseFloat(mhDmg) * (2 + (parseFloat(skillBS) * .02)) / 100
        maxBS = Math.round(maxBS)

        if (charClass !== "Rogue") {
            maxBS = 0
        }

        return maxBS
    }

    function getDmgCap(wepDmg) {
        let damage

        if (charClass == "Enchanter" || charClass == "Magician" || charClass == "Necromancer" || charClass == "Wizard") {
            if (charLevel < 10 && wepDmg > 6) {
                damage = 6
            } else if (charLevel < 20 && wepDmg > 10) {
                damage = 10
            } else if (charLevel < 30 && wepDmg > 12) {
                damage = 12
            } else if (charLevel < 40 && wepDmg > 18) {
                damage = 18
            } else if (charLevel >= 40 && wepDmg > 20) {
                damage = 20
            } else {
                damage = wepDmg
            }
        }

        if (charClass == "Cleric" || charClass == "Druid" || charClass == "Shaman") {
            if (charLevel < 10 && wepDmg > 9) {
                damage = 9
            } else if (charLevel < 20 && wepDmg > 12) {
                damage = 12
            } else if (charLevel < 30 && wepDmg > 20) {
                damage = 20
            } else if (charLevel < 40 && wepDmg > 26) {
                damage = 26
            } else if (charLevel >= 40 && wepDmg > 40) {
                damage = 40
            } else {
                damage = wepDmg
            }
        }

        if (charClass == "Bard" || charClass == "Monk" || charClass == "Paladin" || charClass == "Ranger" ||
            charClass == "Rogue" || charClass == "Shadow Knight" || charClass == "Warrior") {
            if (charLevel < 10 && wepDmg > 10) {
                damage = 10
            } else if (charLevel < 20 && wepDmg > 20) {
                damage = 20
            } else if (charLevel < 30 && wepDmg > 30) {
                damage = 30
            } else if (charLevel < 40 && wepDmg > 60) {
                damage = 60
            } else if (charLevel >= 40 && wepDmg > 100) {
                damage = 100
            } else {
                damage = wepDmg
            }
        }

        return damage
    }
}